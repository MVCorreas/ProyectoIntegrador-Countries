//?INICIAMOS SERVER Y CONECTAMOS CON LA BDD

const axios = require("axios"); //Modulo para hacer peticiones http
const server = require("./src/server"); //Modulo para conectarnos al web server
const { conn } = require('./src/db.js'); //Modulo para conectarnos a la BDD
const PORT = 3001;

conn.sync({ alter: true }).then(() => { //sincroniza con la BDD sin eliminar tablas, si no aplicando los cambios necesarios a ellas
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
})
.catch(error => console.error(error));
