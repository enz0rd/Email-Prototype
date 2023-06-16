const db = require('../models');
const path = require('path')

class CadastroController {

    static async getCadastros(req,res) {
        try {
            return res.sendFile(path.join(__dirname, '../Frontend/public/pages', 'signup.html'))
        } catch(error) {
            return res.status(500).send({message:`Erro ao listar: ${error.message}`});
        }
    }
    
    static async getLogin(req,res) {
        try {
            return res.sendFile(path.join(__dirname, '../Frontend/public/pages', 'signin.html'))
        } catch(error) {
            return res.status(500).send({message:`Erro ao listar: ${error.message}`});
        }
    }

    static async tryLogin(req,res) {
        try {
            const res = await db.Usuario.findOne({
                where: {
                    email: req.body.email,
                    senha: req.body.senha
                }
            })
            if(res) {
            } else {
                return res.send({message: `Email ou senha inválidos`});
            }
        } catch(error) {
            return res.status(500).send({message: `Erro ao listar: ${error.message}`});
        }
    }

    static async addUser(req,res) {
        try {
            const res = await db.Usuario.findOne({
                where: {
                    email: req.body.email,
                }
            })
            if(res) {
                return res.send(`Email já cadastrado`);
            } else {
                const add = await db.Usuario.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: btoa(req.body.password),
                    data_nasc: req.body.data_nasc,
                })
                return res.status(200).send({message:`Cadastro realizado!`});
            }
        } catch(error) {
            return res.status(500).send({message: `Erro ao listar: ${error.message}`});
        }
    }
}

module.exports = CadastroController;