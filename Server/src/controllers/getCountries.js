//?OBTENCION DE INFO DE PAISES POR NOMBRE

const axios = require('axios');
const express = require('express');
const { Op } = require('sequelize');
const { Activity, Country } = require('../db');

const getCountries = async (req, res) => {
    try {
        const { name } = req.query; //parámentro de consulta por nombre
        let countries;

        if (name) {
            countries = await Country.findAll({
                attributes: ['id', 'name', 'flag', 'continents', 'capital', 'subregion', 'area', 'population'],
                where: {
                    name: {
                        [Op.iLike]: `%${name}%` //Operador de sequelize q busca datos que coincidan parcialmente con el name, may y minusculas
                    }
                },
                include: {
                    model: Activity,
                    attributes: ['name', 'type', 'description', 'difficulty', 'duration', 'season'],
                    through: {
                        attributes: []
                    }
                }
            });
            if (countries.length === 0) {
                return res.status(404).json({ error: 'The country does not exist in the database' });
            }
        } else {
            
            countries = await Country.findAll({
                attributes: ['id', 'name', 'flag', 'continents', 'capital', 'subregion', 'area', 'population'],
                include: {
                    model: Activity,
                    attributes: ['name', 'type', 'description', 'difficulty', 'duration', 'season'],
                    through: {
                        attributes: []
                    }
                }
            });
            //console.log(countries)
        }

        res.status(200).json(countries);
    } catch (error) {
        console.error(error);
        const errorMessage = error instanceof TypeError && error.message.includes('404') ? 'Country not found' : 'Internal Server Error';
        const statusCode = error instanceof TypeError && error.message.includes('404') ? 404 : 500;
        res.status(statusCode).json({ error: errorMessage });
      }
};

module.exports = getCountries;