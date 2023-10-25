//? LOS HANDLERS NO TIENEN HABILITADO INTERACTUAR CON LOS MODELOS DE MANERA DIRECTA, MIENTRAS QUE LOS CONTROLLERS SI

const { Country, Activity } = require('../db');


const getActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll({
            attributes: [ 'id', 'name', 'type', 'description', 'difficulty', 'duration', 'season'],
        
            include: {
                model: Country,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });

        res.json(activities);
    } catch (error) {
        console.error(error);
        const errorMessage = error instanceof TypeError && error.message.includes('404') ? 'Country not found' : 'Internal Server Error';
        const statusCode = error instanceof TypeError && error.message.includes('404') ? 404 : 500;
        res.status(statusCode).json({ error: errorMessage });
      }
}

module.exports = getActivities;
