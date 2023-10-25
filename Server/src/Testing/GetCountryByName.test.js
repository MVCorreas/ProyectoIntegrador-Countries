const axios = require('axios');
const express = require('express');
const { Op } = require('sequelize');
const { Activity, Country } = require('../db');
const getCountries = require('../controllers/getCountries');

jest.mock('axios');

describe('getCountries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all countries with activities', async () => {
    const countriesData = [
      {
        id: 1,
        name: 'United States',
        flag: 'flag.png',
        continents: 'Americas',
        capital: 'Washington D.C.',
        subregion: 'Northern America',
        area: 9826675,
        population: 331002651,
      },
      {
        id: 2,
        name: 'Canada',
        flag: 'flag.png',
        continents: 'Americas',
        capital: 'Ottawa',
        subregion: 'Northern America',
        area: 9976140,
        population: 38382500,
      },
    ];
    const activitiesData = [
      {
        name: 'Hiking',
        type: 'Mountain',
        description: 'Hiking in the mountains',
        difficulty: 3,
        duration: '02:00',
        season: 'Summer',
      },
      {
        name: 'Camping',
        type: 'Mountain',
        description: 'Camping in the wilderness',
        difficulty: 2,
        duration: '12:00',
        season: 'Spring',
      },
    ];

    Country.findAll = jest.fn().mockResolvedValue(countriesData);
    Activity.findAll = jest.fn().mockResolvedValue(activitiesData);

    const req = { query: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getCountries(req, res);

    expect(Country.findAll).toHaveBeenCalledWith({
      attributes: ['id', 'name', 'flag', 'continents', 'capital', 'subregion', 'area', 'population'],
      include: {
        model: Activity,
        attributes: ['name', 'type', 'description', 'difficulty', 'duration', 'season'],
        through: {
          attributes: [],
        },
      },
    });
   
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(countriesData);
  });

  it('should return countries filtered by name with activities', async () => {
    const countryName = 'United States';
    const countriesData = [
      {
        id: 1,
        name: 'United States',
        flag: 'flag.png',
        continents: 'Americas',
        capital: 'Washington D.C.',
        subregion: 'Northern America',
        area: 9826675,
        population: 331002651,
      },
    ];
    const activitiesData = [
      {
        name: 'Hiking',
        type: 'Country',
        description: 'Hiking in the mountains',
        difficulty: 3,
        duration: '04:00',
        season: 'Spring',
      },
    ];

    Country.findAll = jest.fn().mockResolvedValue(countriesData);
    Activity.findAll = jest.fn().mockResolvedValue(activitiesData);

    const req = { query: { name: countryName } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }})
});