const express = require('express');
const app = express();
const puerto = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const dbConnection = require('./mongodbconnection/index.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'publico')));


const routes = require('./routes');
app.use('/', routes);

dbConnection.connect(); // Conecta a la base de datos

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});

