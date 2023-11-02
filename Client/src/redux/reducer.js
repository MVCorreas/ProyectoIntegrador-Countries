import { FILTER_BY_ACTIVITY, FILTER_BY_CONTINENT, GET_ACTIVITIES, GET_COUNTRY_BY_NAME, GET_COUNTRY_BY_ID, GET_COUNTRY_DETAIL, GET_DB_COUNTRIES, ORDER_BY_NAME, ORDER_BY_POPULATION, POST_ACTIVITY, CLEAN_DETAIL, ADD_FAV, REMOVE_FAV, SET_CURRENT_PAGE } from './actions';

const initialState = {
    countries: [],
    myFavorites: [],
    countryDetail: {},
    allCountries: [],
    activities: [],
    currentPage: 1,
    totalPages: 1,
    filters: {
      continent: 'AllContinents',
      activity: 'AllActivities',
      orderByName: 'asc',
      orderByPopulation: 'low',
    },
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DB_COUNTRIES:
        return {...state, countries: action.payload, allCountries: action.payload}
      
      case GET_ACTIVITIES:
        return {...state, activities: action.payload}
      
      case GET_COUNTRY_BY_NAME:
        return {...state, countries: action.payload};
      
      case GET_COUNTRY_BY_ID:
        return {...state, countries: action.payload};

      case FILTER_BY_CONTINENT:
        return {
          ...state,
          filters: { ...state.filters, continent: action.payload },
        };

      case FILTER_BY_ACTIVITY:
        return {
          ...state,
          filters: { ...state.filters, activity: action.payload },
        };
      
      case ORDER_BY_NAME:
        const sortedCountries = action.payload === 'asc'
            ? state.countries.slice().sort((a, b) => a.name.localeCompare(b.name)) //?LOCALECOMPARE() metodo que compara strings y les asigna un valor para ordenarlos
            : state.countries.slice().sort((a, b) => b.name.localeCompare(a.name));
          
          console.log(state);
        return {...state, countries: sortedCountries};
      
      case ORDER_BY_POPULATION:
        const sortedPopulation = action.payload === 'low'
            ? state.countries.slice().sort((a, b) => a.population - b.population)
            : state.countries.slice().sort((a, b) => b.population - a.population);
        return {...state, countries: sortedPopulation};
      
      case POST_ACTIVITY:
        const updatedActivities = [...state.activities, action.payload];
        return { ...state, activities: updatedActivities };
    
      case GET_COUNTRY_DETAIL:
          return {...state, countryDetail: action.payload};
      
      case CLEAN_DETAIL:
          return {...state, countryDetail: {}};
      
      case SET_CURRENT_PAGE:
          return {...state, currentPage: payload,};
          
      default:
        return {...state};
    }
    
};

export default rootReducer;
