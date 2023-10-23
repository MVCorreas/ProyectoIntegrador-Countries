const { DataTypes } = require('sequelize');
//const { Country } = require('../db');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Favorite', {
    id: {
      type: DataTypes.STRING(3), 
      primaryKey: true, 
      allowNull: false, 
    },
    // CountryId: { 
    //     type: DataTypes.STRING(3), 
    //     allowNull: false,
    //     references: {
    //       model: Country, 
    //       key: 'id', // La columna en el modelo de referencia que se usa como clave primaria
    //     },
    //   },  
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
   
  }, { timestamps: false });
};