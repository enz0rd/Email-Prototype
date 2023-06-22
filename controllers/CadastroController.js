const db = require('../models');
const path = require('path');
const cookieParser = require("cookie-parser");

class CadastroController {
    static async getCadastros(req, res) {
        try {
            res.sendFile(path.join(__dirname, '../pages', 'signup.html'))
        } catch (error) {
            const error_message = []
            error_message.push({
                title: "Error",
                message: error.message
            })
            res.render('../pages/not_auth', { data: error_message });
        }
    }

    static async getLogin(req, res) {
        try {
            res.sendFile(path.join(__dirname, '../pages', 'signin.html'))
        } catch (error) {
            const error_message = []
            error_message.push({
                title: "Error",
                message: error.message
            })
            res.render('../pages/not_auth', { data: error_message });
        }
    }

    static async tryLogin(req, res) {
        try {
            const resp = await db.Usuario.findOne({
                where: {
                    email: req.body.email,
                    password: btoa(req.body.password)
                }
            })
            if (resp != null) {
                try {
                    const sessionId = btoa(req.body.email);
                    const maxAge = 3600000; // 1 hour in milliseconds
                    const expirationTime = Date.now() + maxAge;
                    res.cookie('sessionId', sessionId, { value: true, maxAge: 3600000 })
                    res.cookie('expirationTime', expirationTime, { maxAge });
                    console.log(`Redirecting`);
                    res.redirect('/home');
                } catch (error) {
                    console.log(`Erro ao listar: ${error.message}`)
                    const error_message = []
                    error_message.push({
                        title: "Error",
                        message: error.message
                    })
                    res.render('../pages/not_auth', { data: error_message });
                }
            } else {
                res.send({ message: "Invalid credentials" });
            }

        } catch (error) {
            console.log(`Erro ao listar: ${error.message}`)
            const error_message = []
            error_message.push({
                title: "Error",
                message: error.message
            })
            res.render('../pages/not_auth', { data: error_message });
        }
    }

    static async Logout(req, res) {
        res.clearCookie("sessionId");
        res.clearCookie("expirationTime");
        res.sendFile(path.join(__dirname, '../pages', 'loggedout.html'));
    }

    static async addUser(req, res) {
        try {
            const resp = await db.Usuario.findOne({
                where: {
                    email: req.body.email,
                }
            })
            if (resp) {
                res.send({ message: "This email is already in use!" });
            } else {
                const add = await db.Usuario.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: btoa(req.body.password),
                    data_nasc: req.body.birth,
                    status: "Ativo"
                })
                try {
                    const sessionId = btoa(req.body.email);
                    const maxAge = 3600000; // 1 hour in milliseconds
                    const expirationTime = Date.now() + maxAge;
                    res.cookie('sessionId', sessionId, { value: true, maxAge: 3600000 })
                    res.cookie('expirationTime', expirationTime, { maxAge });
                    console.log(`Redirecting`)
                    res.redirect('/home');
                } catch (error) {
                    console.log(`Erro ao listar: ${error.message}`)
                    const error_message = []
                    error_message.push({
                        title: "Error",
                        message: error.message
                    })
                    res.render('../pages/not_auth', { data: error_message });
                }
            }
        } catch (error) {
            console.log(`Erro ao listar: ${error.message}`)
            const error_message = []
            error_message.push({
                title: "Error",
                message: error.message
            })
            res.render('../pages/not_auth', { data: error_message });
        }
    }
}

module.exports = CadastroController;