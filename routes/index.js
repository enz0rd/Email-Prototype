const bodyParser = require('body-parser')
const cadastro = require('./cadastroRoutes.js')
const home = require('./homeRoutes.js')


const cookieParser = require("cookie-parser");
const sessions = require('express-session');

module.exports = app => {
    app.use(bodyParser.json());
    app.get('/', (req, res) => res.redirect('/home'))
    app.use(cadastro, home);
    app.use(cookieParser());
    app.set('view engine', 'ejs');
}