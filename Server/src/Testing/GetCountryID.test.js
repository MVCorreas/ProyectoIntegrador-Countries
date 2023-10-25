const { getCountryById } = require('../controllers/getCountryById.js');

describe('getCountryById', () => {
  it('should include activities in the country object', async () => {
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock de la función findByPk del modelo Country
    const Country = {
      findByPk: jest.fn().mockResolvedValue({
        id: 1,
        name: 'United States',
        flag: 'flag.png',
        continents: 'Americas',
        capital: 'Washington D.C.',
        subregion: 'Northern America',
        area: 9826675,
        population: 331002653,
      }),
    };

    // Mock de la función findAll del modelo Activity
    const Activity = {
      findAll: jest.fn().mockResolvedValue([
        {
          name: 'Hiking',
          type: 'Mountains',
          description: 'Hiking in the mountains',
          difficulty: 'Easy',
          duration: '04:00',
          season: 'Spring',
        },
      ]),
    };

    // Call the function
    await getCountryById(req, res);

    expect(Country.findByPk).toHaveBeenCalledWith(1, {
      attributes: ['id', 'name', 'flag', 'continents', 'capital', 'subregion', 'area', 'population'],
      include: {
        model: Activity, // Asegúrate de que el modelo Activity esté configurado correctamente
        attributes: ['name', 'type', 'description', 'difficulty', 'duration', 'season'],
        through: {
          attributes: [],
        },
      },
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      name: 'United States',
      flag: 'flag.png',
      continents: 'Americas',
      capital: 'Washington D.C.',
      subregion: 'Northern America',
      area: 9826675,
      population: 331002653,
      activities: [
        {
          name: 'Hiking',
          type: 'Mountains',
          description: 'Hiking in the mountains',
          difficulty: 'Easy',
          duration: '04:00',
          season: 'Spring',
        },
      ],
    });
  });
});
