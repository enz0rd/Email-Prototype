const db = require('../models');
const path = require('path');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const { resourceLimits } = require('worker_threads');

var session;

class HomeController {
    static async getHome(req,res) {
        try {
            try {
                const sessionId = req.cookies.sessionId
                const maxAge = req.cookies.expirationTime;
                var result = await db.Usuario.findOne({where: {email: atob(sessionId)}})
                try {
                    if(result) {
                        if(maxAge < Date.now()) {
                            console.log(`Não autorizado`)
                            res.status(304).send({message: 'Não autorizado'});
                        } else {
                            console.log(`${sessionId} Autorizado`)
                            res.sendFile(path.join(__dirname, '../pages', 'home.html'));
                        }
                    } else {
                        console.log(`Não autorizado`)
                        res.status(304).send({message: 'Não autorizado'});
                    }
                } catch (error) {
                    console.log(`Erro ao listar: ${error.message}`)
                }
            } catch (error) {
                console.log(`Erro ao listar: ${error.message}`)
                res.send({message: 'Não autorizado'});
            }
        } catch (error) {
            console.log(`Erro ao listar: ${error.message}`)
            res.status(500).send({ message: `Erro ao listar: ${error.message}` });
        }
    }
}

module.exports = HomeController;