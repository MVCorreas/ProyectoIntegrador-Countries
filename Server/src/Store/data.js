//?PETICION Y GUARDADO DE INFO EN BDD

const axios = require('axios');
const { Country } = require('../db.js');

const getApiData = async (req, res) => {
    try {
        const apiData = await axios.get('http://localhost:5000/countries'); //Petición a una api para obtener datos
   
    const apiFilter = await apiData.data.map(country => { 
        return {
            id: country.cca3 !== undefined ? country.cca3 : ('No ID for display'),
            name: country.name.common,
            flag: country.flags.png,
            continents: country.region,
            capital: country.capital !== undefined ? country.capital[0] : ('No capital for display'),
            subregion: country.subregion,
            area: country.area,
            population: country.population,
        };
      });
      //console.log(apiFilter);

      await Country.bulkCreate(apiFilter); //Almacenamiento de datos en la tabla Country de la BDD - Bulkcreate inserta muchos registros simultáneamente
      //console.log('Data stored successfully');

      res.status(200).json({message: 'Data stored successfully'});//Respuesta HTTP al cliente
      
    
    } catch (error) {
        //console.log(error)
        res.status(500).json({message: 'Error storing data'});
    }
    
};

module.exports = getApiData;