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

    const activityId = createdActivity.id; // Obtener el ID de la actividad creada

    // Buscar los objetos de país correspondientes por nombre
    const countryObjects = await Country.findAll({
      where: {
        name: {
          [Op.in]: countries,
        },
      },
    });

    // Asociar la actividad con los países encontrados
    await createdActivity.setCountries(countryObjects);

    res.status(201).json({ id: activityId, message: 'Activity created successfully' }); // Devolver el ID de la actividad
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof TypeError && error.message.includes('404') ? 'Country not found' : 'Internal Server Error';
    const statusCode = error instanceof TypeError && error.message.includes('404') ? 404 : 500;
    res.status(statusCode).json({ error: errorMessage });
  }
};

module.exports = postActivities;
