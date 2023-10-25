const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
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
}, { timestamps: false });
}