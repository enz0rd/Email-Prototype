const express = require('express');
const routes = require('./routes/index');
const cookieParser = require("cookie-parser");

const app = express();

routes(app);

app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.listen(port, () => {
    console.log(`Server rodando em:
    http://localhost:${port}/`);
    app.use(express.static(__dirname))
    app.use(function(req, res, next) {
        res.status(404);

        if(req.accepts('html')) {
            var error = [{
                title: "404 not found",
                message: "Page not found, returning to login"
            }]
            res.render('../pages/not_auth', { data: error });
        }
    })
    app.use(cookieParser("c2VjcmV0ZW1haWxrZXl0b2Vuc3VyZXNlY3VyaXR5"));
})

module.exports = app