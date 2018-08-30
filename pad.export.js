const express = require('express');
const bodyParser = require('body-parser'); // body-parser, middleware para receber o json no body da requisição

const padRouter = require('./src/router/pad') // requer a rota

let app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', padRouter); // Usa a rota

module.exports = app;