// Importa las funciones y objetos necesarios
const { postActivities } = require('../controllers/postActvities.js');

describe('postActivities', () => {
  it('should create a new activity and associate it with countries', async () => {
    const req = {
      body: {
        name: 'Hiking',
        type: 'Mountain',
        description: 'Hiking in the mountains',
        difficulty: 1, // Debes asegurarte de que el valor sea válido según tu modelo
        duration: '04:00',
        season: 'Spring',
        countries: ['United States', 'Canada'],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock de la función create del modelo Activity
    const Activity = {
      create: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Hiking',
        type: 'Mountain',
        description: 'Hiking in the mountains',
        difficulty: 1,
        duration: '04:00',
        season: 'Spring',
      }),
    };

    // Mock de la función findAll del modelo Country
    const Country = {
      findAll: jest.fn().mockResolvedValue([
        {
          id: 'USA',
          name: 'United States',
        },
        {
          id: 'CAN',
          name: 'Canada',
        },
      ]),
    };

    // Call the function
    await postActivities(req, res);

    // Realiza las aserciones
    expect(Activity.create).toHaveBeenCalledWith({
      name: 'Hiking',
      type: 'Mountain',
      description: 'Hiking in the mountains',
      difficulty: 1,
      duration: '04:00',
      season: 'Spring',
    });
    expect(Country.findAll).toHaveBeenCalledWith({
      where: {
        name: {
          [Op.in]: ['United States', 'Canada'],
        },
      },
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith('Activity created successfully');
  });
});
