const bodyParser = require('body-parser')
const cadastro = require('./cadastroRoutes')

module.exports = app => {
    app.use(bodyParser.json());
    app.get('/', (req,res) => res.redirect('/signin'))
    app.use(cadastro);
}