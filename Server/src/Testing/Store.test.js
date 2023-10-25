const axios = require('axios');
const { Country } = require('../db.js');
const getApiData = require('../Store/data.js');

jest.mock('axios');

describe('getApiData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should store data from API and return success message', async () => {
    const mockData = [
      {
        cca3: 'USA',
        name: {
          common: 'United States',
        },
        flags: {
          png: 'flag.png',
        },
        region: 'Americas',
        capital: ['Washington D.C.'],
        subregion: 'Northern America',
        area: 9826675,
        population: 331002651,
      },
      
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Country.bulkCreate function
    Country.bulkCreate = jest.fn().mockResolvedValue();

    await getApiData(req, res);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/countries');
    expect(Country.bulkCreate).toHaveBeenCalledWith([
      {
        id: 'USA',
        name: 'United States',
        flag: 'flag.png',
        continents: 'Americas',
        capital: 'Washington D.C.',
        subregion: 'Northern America',
        area: 9826675,
        population: 331002651,
      },
      
    ]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Data stored successfully' });
  });

  it('should handle errors and return error message', async () => {
    const errorMessage = 'Error fetching data from API';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    // Mock the Country.bulkCreate function
    Country.bulkCreate = jest.fn().mockResolvedValue();

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getApiData(req, res);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/countries');
    expect(Country.bulkCreate).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error storing data' });
  });
});