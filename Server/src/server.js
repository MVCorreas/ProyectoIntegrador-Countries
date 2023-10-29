//?CREAMOS EL SERVIDOR - AGREGAMOS LAS MIDDLEWARES, Y HACEMOS QUE DIRIJA A ROUTES

const express = require("express"); //biblioteca para crear y configurar un servidor web
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors"); //se utiliza para habilitar el acceso a recursos en un servidor desde un dominio diferente (necesario para permitir solicitudes desde orígenes cruzados).

const server = express(); //creamos una instancia de Express

//Configuramos los Middlewares
server.use(morgan("dev")); //modo development para registrar y depurar solicitudes HTTP durante el desarrollo de una app web
server.use(express.json());//Permite a Express analizar datos JSON
server.use(cors());//Permite que el server responda desde dominios que no son propios

server.use(router); //conecta rutas al servidor

module.exports = server;
