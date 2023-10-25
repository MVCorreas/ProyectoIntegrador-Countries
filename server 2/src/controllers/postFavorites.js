const { Favorite, Country } = require('../db');

const postFavorite = async (req, res) => {
    try {
        const { id, name, continents, capital, subregion, flag } = req.body;
        console.log('Recibida solicitud para agregar país favorito:', name);

        // Buscar el país en el modelo Country
        const country = await Country.findOne({
            where: { name },
        });

        if (!country) {
            // Manejar el caso en el que el país no existe en el modelo Country
            res.status(404).json({ error: 'El país no existe en la base de datos.' });
            return;
        }

        console.log('País encontrado en la base de datos:', country.name);

        const [newFav, created] = await Favorite.findOrCreate({
            where: { CountryId: country.id }, // Establecer la relación con el país
            defaults: { id, flag, continents, capital, subregion },
        });

        const allFavs = await Favorite.findAll();

        if (created) {
            console.log('Nuevo país favorito creado:', name);
            res.status(201).json(allFavs);
        } else {
            console.log('El país ya es un favorito:', name);
            res.status(200).json(allFavs);
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postFavorite;
