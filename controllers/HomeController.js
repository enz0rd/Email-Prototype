const db = require('../models');
const sequelize = require('sequelize')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const { resourceLimits } = require('worker_threads');
const { json } = require('express');
const moment = require('moment');
const path = require('path');

class HomeController {

    static async getLanding(req,res) {
        try {
            res.sendFile(path.join(__dirname, '../pages', 'landing.html'))
        } catch (error) {
            const error_message = []
            error_message.push({
                title: "Error",
                message: error.message + " Returning to login"
            })
            res.render('../pages/not_auth', { data: error_message });
        }
    }

    static async getHome(req, res) {
        try {
            const userEmail = atob(req.cookies.sessionId);

            const fetch = await db.Email.findAll({
                attributes: [
                    'id',
                    [sequelize.literal(`(SELECT name FROM usuarios WHERE id = Email.idusuario_origem)`), 'name'],
                    [sequelize.literal(`(SELECT email FROM usuarios WHERE id = Email.idusuario_origem)`), 'email'],
                    'texto',
                    [sequelize.literal(`DATE_FORMAT(Email.data_envio, '%d/%m/%Y %H:%i')`), 'formatted_data_envio']
                    ],
                where: {
                  idusuario_dest: sequelize.literal(`idusuario_dest = (SELECT id FROM usuarios WHERE email = '${userEmail}')`)
                }
            });
            const jsonString = JSON.stringify(fetch)
            const jsonParse = JSON.parse(jsonString)
            if(jsonParse.length == 0) {
                jsonParse.push({
                    id: null,
                    name: "Empty",
                    texto: "Still nothing here!",
                    formatted_data_envio: "now"
                  });
                }
                // console.log(jsonParse)
            
            var check = checkCookies(req, res)
            if(check) {
                res.render('../pages/home', { data: jsonParse });
                // res.sendFile(path.join(__dirname, '../pages', `home.ejs`));
            } else {
                var error = {
                    title: "Not Authorized",
                    message: "Returning to login"
                }
                res.render('../pages/not_auth', { data: error });
            }
        } catch (error) {
            console.log(`Erro ao listar: ${error.message}`)
            const error_message = []
            if(error.message == "The string to be decoded is not correctly encoded.") {
                error_message.push({
                    title: "Not Authorized",
                    message: `Not authorized, returning to login`
                })
            } else {
                error_message.push({
                    title: "Error",
                    message: error.message + " Returning to login"
                })
            }
            res.render('../pages/not_auth', { data: error_message });
        }
    }

    static async getSent(req, res) {
        try {
            const userEmail = atob(req.cookies.sessionId);

            const fetch = await db.Email.findAll({
                attributes: [
                    'id',
                    [sequelize.literal(`(SELECT name FROM usuarios WHERE id = Email.idusuario_dest)`), 'name'],
                    [sequelize.literal(`(SELECT email FROM usuarios WHERE id = Email.idusuario_dest)`), 'email'],
                    'texto',
                    [sequelize.literal(`DATE_FORMAT(Email.data_envio, '%d/%m/%Y %H:%i')`), 'formatted_data_envio']
                    ],
                where: {
                  idusuario_dest: sequelize.literal(`idusuario_origem = (SELECT id FROM usuarios WHERE email = '${userEmail}')`)
                }
            });
            const jsonString = JSON.stringify(fetch)
            const jsonParse = JSON.parse(jsonString)
            if(jsonParse.length == 0) {
                jsonParse.push({
                    id: null,
                    name: "Empty",
                    texto: "Still nothing here, try sending emails!",
                    formatted_data_envio: "now"
                  });
                }
                // console.log(jsonParse)
            
            var check = checkCookies(req, res)
            if(check) {
                res.render('../pages/sent', { data: jsonParse });
                // res.sendFile(path.join(__dirname, '../pages', `home.ejs`));
            } else {
                var error = {
                    title: "Not Authorized",
                    message: "Returning to login"
                }
                res.render('../pages/not_auth', { data: error });
            }
        } catch (error) {
            console.log(`Erro ao listar: ${error.message}`)
            const error_message = []
            if(error.message == "The string to be decoded is not correctly encoded.") {
                error_message.push({
                    title: "Not Authorized",
                    message: `Not authorized, returning to login`
                })
            } else {
                error_message.push({
                    title: "Error",
                    message: error.message + " Returning to login"
                })
            }
            res.render('../pages/not_auth', { data: error_message });
        }
    }
}

async function checkCookies(req, res) {
    try {
        const sessionId = req.cookies.sessionId
        const maxAge = req.cookies.expirationTime;
        if (sessionId == null || maxAge == null) {
            console.log(`Não autorizado`)
            return false
        } else {
            var result = await db.Usuario.findOne({ where: { email: atob(sessionId) } })
            try {
                if (result) {
                    if (maxAge < Date.now()) {
                        console.log(`Não autorizado`)
                        return false
                    } else {
                        console.log(`${sessionId} Autorizado`)
                        return true
                    }
                } else {
                    console.log(`Não autorizado`)
                    return false
                }
            } catch (error) {
                console.log(`Erro ao listar: ${error.message}`)
                return false
            }
        }
    } catch (error) {
        console.log(`Erro ao listar: ${error.message}`)
        return false
    }
}

module.exports = HomeController;