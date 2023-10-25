import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../redux/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');

describe('Redux Actions', () => {
  it('should dispatch GET_DB_COUNTRIES action with data', async () => {
    const store = mockStore({});
    const countriesData = [
      { id: 'USA', name: 'United States', flag: 'flag.png' },
      { id: 'CAN', name: 'Canada', flag: 'flag.png' },
    ];

    axios.get.mockResolvedValue({ data: countriesData });

    await store.dispatch(actions.getDbCountries());

    const expectedActions = [
      {
        type: 'GET_DB_COUNTRIES',
        payload: countriesData,
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch GET_ACTIVITIES action with data', async () => {
    const store = mockStore({});
    const activitiesData = [
      { name: 'Hiking', type: 'Mountain', description: 'Hiking in the mountains' },

    ];

    axios.get.mockResolvedValue({ data: activitiesData });

    await store.dispatch(actions.getActivities());

    const expectedActions = [
      {
        type: 'GET_ACTIVITIES',
        payload: activitiesData,
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch POST_ACTIVITY action with response data', async () => {
    const store = mockStore({});
    const activityPayload = {
      name: 'Hiking',
      type: 'Mountain',
      description: 'Hiking in the mountains',
     
    };

    const responseData = {
      id: 1,
      name: 'Hiking',
      type: 'Mountain',
      description: 'Hiking in the mountains',
     
    };

    axios.post.mockResolvedValue({ data: responseData });

    await store.dispatch(actions.postActivity(activityPayload));

    const expectedActions = [
      {
        type: 'POST_ACTIVITY',
        payload: responseData,
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

});
