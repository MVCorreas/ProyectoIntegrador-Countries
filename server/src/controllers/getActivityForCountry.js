const axios = require('axios');
const { Country, Activity } = require('../db');


const getActivitiesForCountry = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Primero, busca el país por su ID
        const country = await Country.findByPk(id, {
            include: {
                model: Activity,
                attributes: ['name', 'type', 'description', 'difficulty', 'duration', 'season'],
                through: {
                    attributes: [], // Exclude the data from the intermediate table
                  },

            } // Esto cargará todas las actividades relacionadas con el país
        });
    
        if (!country) {
          return res.status(404).json({ error: 'Country not found' });
        }
    
        // Las actividades están disponibles en country.Activities
        const activities = country.Activities || [];
    
        res.status(200).json(activities);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = getActivitiesForCountry;