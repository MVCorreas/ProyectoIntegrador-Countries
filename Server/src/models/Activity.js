const { DataTypes } = require('sequelize'); //Importamos el objeto de Sequelize que nos permitirá establecer tipos de datos

module.exports = (sequelize) => {
  // defino el modelo, el cual crea una tabla en la BDD
  sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50], 
      }
    },
    type: {
      type: DataTypes.ENUM("City", "Country", "Beach", "Forest", "Mountain"),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200], 
      },
    },
    difficulty: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      validate: {
        min: 1, 
        max: 5, 
      },
    },
    duration: {
      type: DataTypes.TIME, 
      allowNull: true,
    },
    season: {
      type: DataTypes.ENUM('Winter', 'Spring', 'Summer', 'Autumn'), 
      allowNull: false,
    },
    // createdInDb: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: false,
    //     defaultValue: true
    // }
}, { timestamps: false }); //Evito que se agreguen automáticamente campos de registro de tiempo (como "createdAt" y "updatedAt") a la tabla de la BDD.
}