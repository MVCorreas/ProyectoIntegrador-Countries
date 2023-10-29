//?CREAR ACTIVIDADES TURISTICAS Y ASOCIARLAS A PAISES

const { Country, Activity } = require('../db');
const { Op } = require('sequelize');

const postActivities = async (req, res) => {
  try {
    const { name, type, description, difficulty, duration, season, countries } = req.body; //para obtener datos de la solicitud POST

    //Validación de datos
    if (countries.length === 0) {
      return res.status(400).json({ error: 'Please specify at least one country for this activity' });
    }

    const createdActivity = await Activity.create({
      name,
      description,
      type,
      season,
      difficulty,
      duration,
    });

    // Buscar los objetos de país correspondientes por nombre
    const countryObjects = await Country.findAll({
      where: {
        name: {//busca por nombre, no ID, para que en el front pueda desplegar el select con nombres e ir sumando nombres (no IDs) al array
          [Op.in]: countries, // Buscar por nombre en lugar de ID, checks if a value is in a list of values
        },
      },
    });

    // Asociar la actividad con los países encontrados
    await createdActivity.setCountries(countryObjects); //setCountries reemplaza todas las asociaciones existentes con las nuevas, mientras que addCountries agrega nuevas asociaciones a las existentes sin eliminarlas. 

    res.status(201).json('Activity created successfully');
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof TypeError && error.message.includes('404') ? 'Country not found' : 'Internal Server Error';
    const statusCode = error instanceof TypeError && error.message.includes('404') ? 404 : 500;
    res.status(statusCode).json({ error: errorMessage });
  }
};

module.exports = postActivities;
