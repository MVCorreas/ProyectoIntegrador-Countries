const Favorite = require('../db');

const deleteFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const foundCountry = await Favorite.findByPk(id) 

       if (!foundCountry) {
        return res.status(404).json('Country not found');
       }
       await foundCountry.destroy();

       const allFavs = await Favorite.findAll();
       res.status(200).json(allFavs);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = deleteFavorite;