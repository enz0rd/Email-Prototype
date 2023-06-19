const db = require('../models');
const path = require('path')

class CadastroController {

    static async getCadastros(req,res) {
        try {
            res.sendFile(path.join(__dirname, '../Frontend/public/pages', 'signup.html'))
        } catch(error) {
            res.status(500).send({message:`Erro ao listar: ${error.message}`});
        }
    }
    
    static async getLogin(req,res) {
        try {
            res.sendFile(path.join(__dirname, '../Frontend/public/pages', 'signin.html'))
        } catch(error) {
            res.status(500).send({message:`Erro ao listar: ${error.message}`});
        }
    }

    static async tryLogin(req,res) {
        try {
            const resp = await db.Usuario.findOne({
                where: {
                    email: req.body.email,
                    password: btoa(req.body.password)
                }
            })
            if(resp) {
                setTimeout(function() {
                    res.send({ message: "Bem Vindo!" });
                    // setTimeout(function() {
                    //   res.redirect('/home'); // Redirecionamento após 5 segundos da resposta inicial
                    // }, 5000); // 5000 milissegundos = 5 segundos
                  }, 0);
            } else {
                res.send({message: "Dados inválidos"});
            }
        } catch(error) {
            res.status(500).send({message: `Erro ao listar: ${error.message}`});
        }
    }

    static async addUser(req,res) {
        try {
            const resp = await db.Usuario.findOne({
                where: {
                    email: req.body.email,
                }
            })
            if(resp) {
                res.send({message:"Já existe um cadastro nesse email!"});
            } else {
                const add = await db.Usuario.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: btoa(req.body.password),
                    data_nasc: req.body.birth,
                    status: "Ativo"
                })
                res.status(200).send({message:`Cadastro realizado!`});
            }
        } catch(error) {
            res.status(500).send({message: `Erro ao listar: ${error.message}`});
        }
    }
}

module.exports = CadastroController;