const express = require('express');
const routes = require('./routes/index')

const app = express();

app.use(express.static('public'))

routes(app);

const port = 3000;

app.listen(port, () => {
    console.log(`Server rodando em:
    http://localhost:${port}/`);
})

module.exports = app