const db = require('../models');
const sequelize = require('sequelize')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const { resourceLimits } = require('worker_threads');
const { json } = require('express');


class EmailController {
    static async getNewEmail(req, res) {
        try {
            const userEmail = atob(req.cookies.sessionId);
            var check = checkCookies(req, res)
            if(check) {
                res.render('../pages/new_email');
                // res.sendFile(path.join(__dirname, '../pages', `home.ejs`));
            } else {
                var error = [{
                    title: "Not Authorized",
                    message: "Returning to login"
                }]
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

    static async trySendEmail(req, res) {
        try {
            const userEmail = atob(req.cookies.sessionId);
            console.log(userEmail)
            var check = checkCookies(req, res)
            if(check) {
                if(req.body.email_dest == userEmail) {
                    res.send({ message: "Cannot send email to yourself" });
                } else {
                    const resp = await db.Usuario.findOne({
                        where: {
                            email: req.body.email_dest,
                        }
                    })
                    if (resp != null) {
                        try {
                            const origem = await db.Usuario.findOne({
                                attributes: [
                                    'id'
                                ],
                                where: {
                                    email: userEmail
                                }
                            })
                            const dest = await db.Usuario.findOne({
                                attributes: [
                                    'id'
                                ],
                                where: {
                                    email: req.body.email_dest
                                }
                            })
                            const iduser_d = JSON.stringify(dest) 
                            const iduser_or = JSON.stringify(origem) 
                            const iduser_d_format = JSON.parse(iduser_d) 
                            const iduser_or_format = JSON.parse(iduser_or) 
                            const iduser_dest = iduser_d_format.id
                            const iduser_origem = iduser_or_format.id 
                            console.log(iduser_dest);
                            console.log(iduser_origem);
                            const new_email = await db.Email.create({
                                idusuario_origem: iduser_origem,
                                idusuario_dest: iduser_dest,
                                texto: req.body.text,
                                data_envio: new Date,
                                createdAt: new Date,
                                updatedAt: new Date,
                            });
                            res.redirect('/home');
                        } catch (error) {
                            console.log(`Erro ao listar: ${error.message}`)
                            res.send({ message: "Error while communicating with the database" });
                        }
                    } else {
                        res.send({ message: "User not found" });
                    }
                }
            } else {
                var error = [{
                    title: "Not Authorized",
                    message: "Returning to login"
                }]
                res.render('../pages/not_auth', { data: error });
            }
        } catch (error) {
            console.log(`Erro ao listar: ${error.message}`)
            console.log(`${req.cookies.sessionId}`)
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

module.exports = EmailController