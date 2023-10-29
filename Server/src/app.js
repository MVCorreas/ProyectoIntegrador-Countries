const express = require('express')

//crea instancia de Express que se emplea para config el web server y definir rutas y middlewares
const server = express() 
const router = require('./routes/index')
const morgan = require("morgan");
//const cookieParser = require("cookie-parser");
// Libreria Dotenv -> guardar nuestras variables de entorno
// .env



server.use((req, res, next) => { //configurar encabezados de respuesta CORS (Cross-Origin Resource Sharing)
  res.header('Access-Control-Allow-Origin', '*'); //Permiso acceso desde cualquier origen
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
     'Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header( //definición d métodos HTTP permitidos
     'Access-Control-Allow-Methods',
     'GET, POST, OPTIONS, PUT, DELETE'
  );
  next();
});

server.use(morgan("dev")); //modo development para registrar y depurar solicitudes HTTP durante el desarrollo de una app web
server.use(express.json()); //Permite a Express analizar datos JSON
server.use("/countries", router); //Middleware de enrutamiento, especifica la ruta base /countries, 
//server.use(cookieParser());

module.exports = server;