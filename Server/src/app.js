const express = require('express')
const server = express()
const router = require('./routes/index')
const morgan = require("morgan");
//const cookieParser = require("cookie-parser");
// Libreria Dotenv -> guardar nuestras variables de entorno
// .env



server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
     'Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
     'Access-Control-Allow-Methods',
     'GET, POST, OPTIONS, PUT, DELETE'
  );
  next();
});

server.use(morgan("dev"));
server.use(express.json());
server.use("/countries", router);
//server.use(cookieParser());

module.exports = server;