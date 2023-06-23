const bodyParser = require('body-parser')
const cadastro = require('./cadastroRoutes.js')
const email = require('./emailRoutes.js')
const home = require('./homeRoutes.js')


const cookieParser = require("cookie-parser");
const sessions = require('express-session');

module.exports = app => {
    app.use(bodyParser.json());
    app.use(cadastro, home, email);
    app.use(cookieParser());
    app.set('view engine', 'ejs');
}