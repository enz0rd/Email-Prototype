const db = require('../models');
const path = require('path');
const sequelize = require('sequelize')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const { resourceLimits } = require('worker_threads');

class HomeController {
    static async getHome(req, res) {
        try {
            const userEmail = atob(req.cookies.sessionId);

            const fetch = await db.Email.findAll({
                attributes: ['texto', 'data_envio'],
                include: [
                  {
                    model: db.Usuario,
                    as: 'origem',
                    attributes: ['name', 'email']
                  }
                ],
                where: {
                  idusuario_dest: sequelize.literal(`(SELECT id FROM usuarios WHERE email = '${userEmail}')`)
                }
              });
              

            console.log(fetch);
            checkCookies(req, res, "home.html")
        } catch (error) {
            console.log(`Erro ao listar: ${error.message}`)
            res.status(500).send({ message: `Erro ao listar: ${error.message}` });
        }
    }
}

async function checkCookies(req, res, page) {
    try {
        const sessionId = req.cookies.sessionId
        const maxAge = req.cookies.expirationTime;
        if (sessionId == null || maxAge == null) {
            console.log(`Não autorizado`)
            res.sendFile(path.join(__dirname, '../pages', 'not_auth.html'));
        } else {
            var result = await db.Usuario.findOne({ where: { email: atob(sessionId) } })
            try {
                if (result) {
                    if (maxAge < Date.now()) {
                        console.log(`Não autorizado`)
                        res.sendFile(path.join(__dirname, '../pages', 'not_auth.html'));
                    } else {
                        console.log(`${sessionId} Autorizado`)
                        res.sendFile(path.join(__dirname, '../pages', `${page}`));
                    }
                } else {
                    console.log(`Não autorizado`)
                    res.sendFile(path.join(__dirname, '../pages', 'not_auth.html'));
                }
            } catch (error) {
                console.log(`Erro ao listar: ${error.message}`)
            }
        }
    } catch (error) {
        console.log(`Erro ao listar: ${error.message}`)
        res.sendFile(path.join(__dirname, '../pages', 'not_auth.html'));
    }
}

module.exports = HomeController;