const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo lo cual crea una tabla en la BDD
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING(3), 
      primaryKey: true, 
      allowNull: false, 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag: {
      type: DataTypes.STRING, // Imagen de la bandera (uso Cloudinary???)
      allowNull: false,
    },
    continents: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    area: {
      type: DataTypes.FLOAT, 
      allowNull: true
    },
    population: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
  }, { timestamps: false }); //Evito que se agreguen automáticamente campos de registro de tiempo (como "createdAt" y "updatedAt") a la tabla de la BDD.
  
};