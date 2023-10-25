const axios = require('axios');
const { Country, Activity } = require('../db');


const getCountryById = async (req, res) => {
    try {
        const {id} = req.params;
        
        const country = await Country.findByPk(id, {
            attributes: ['id', 'name', 'flag', 'continents', 'capital', 'subregion', 'area', 'population'],
            include: {
                model: Activity,
                attributes: ['name', 'type', 'description', 'difficulty', 'duration', 'season'],
                through: {
                    attributes: [], // Exclude the data from the intermediate table
                  },

            }
        });
        console.log(country)
        res.status(200).json(country);
    
    } catch (error) {
        console.error(error);
        const errorMessage = error.includes(404) ? 'Country not found' : 'Internal Server Error';
        const statusCode = error.includes(404) ? 404 : 500;

        res.status(statusCode).json({ error: errorMessage });
    }
}

module.exports = getCountryById;