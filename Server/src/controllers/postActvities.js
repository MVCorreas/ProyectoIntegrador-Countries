const { Country, Activity } = require('../db');
const { Op } = require('sequelize');

const postActivities = async (req, res) => {
  try {
    const { name, type, description, difficulty, duration, season, countries } = req.body;

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
        name: {
          [Op.in]: countries, // Buscar por nombre en lugar de ID
        },
      },
    });

    // Asociar la actividad con los países encontrados
    await createdActivity.setCountries(countryObjects);

    res.status(201).json('Activity created successfully');
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof TypeError && error.message.includes('404') ? 'Country not found' : 'Internal Server Error';
    const statusCode = error instanceof TypeError && error.message.includes('404') ? 404 : 500;
    res.status(statusCode).json({ error: errorMessage });
  }
};

module.exports = postActivities;
