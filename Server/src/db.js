//!TESTING: Comento process.env

//?CONFIGURAR Y ESTABLECER CONEXION CON LA BDD POSTGRES MEDIANTE SEQUELIZE (UN ORM DE NODE)
//?ORM --> Object Relational Mapping: tecnica de programacion que mapea objetos de un sist de programacion orientado a objetos (eg. JAVASCRIPT), a estructuras de datos (eg. SQL)


//?CONFIGURACION DE LA BDD
require("dotenv").config(); //Carga las variables de entorno de .env
const { Sequelize } = require("sequelize"); //Crea instancia de Sequelize


const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env; //Emplea las variables de entonrno para config la URL de conexion

//process.env.DB_HOST = 'localhost';
console.log(process.env.DB_HOST);

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false, 
  native: false, 
});

console.log(`Dirección IP del host: ${sequelize.config.host}`);

const basename = path.basename(__filename);


//?IMPORTAMOS MODELOS 

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize)); //Cada modelo definido se agrega a la isntancia de sequelize

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Country, Activity, User, Favorite } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

//? ESTABLECEMOS RELACIONES ENTRE MODELOS

Country.belongsToMany(Activity, {through: 'country_activity'});
Activity.belongsToMany(Country, {through: 'country_activity'});
Favorite.belongsToMany(Country, {through: 'favorite-country'});



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};