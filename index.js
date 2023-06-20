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
    app.use(cookieParser("c2VjcmV0ZW1haWxrZXl0b2Vuc3VyZXNlY3VyaXR5"));
})

module.exports = app