const express = require('express');
const app = express();
const puerto = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const dbConnection = require('./mongodbconnection/index.js');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos desde el directorio 'publico'
app.use(express.static(path.join(__dirname, 'publico')));

// Conexión a la base de datos
dbConnection.connect();

// Middleware para manejar la Directory Listing
app.use((req, res, next) => {
  const dirPath = path.join(__dirname, 'publico', req.path);
  
  // Comprobar si la ruta es un directorio
  if (req.path.endsWith('/') || req.path === '/') {
    // Listar el contenido del directorio
    return res.sendFile(path.join(dirPath, 'index.html'));
  }
  
  // Si no es un directorio, continuar con el siguiente middleware
  next();
});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
