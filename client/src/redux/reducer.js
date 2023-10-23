import { FILTER_BY_ACTIVITY, FILTER_BY_CONTINENT, GET_ACTIVITIES, GET_COUNTRY_BY_NAME, GET_COUNTRY_DETAIL, GET_DB_COUNTRIES, ORDER_BY_NAME, ORDER_BY_POPULATION, POST_ACTIVITY, CLEAN_DETAIL, ADD_FAV, REMOVE_FAV, SET_CURRENT_PAGE } from './actions';

const initialState = {
    countries: [],
    myFavorites: [],
    countryDetail: {},
    allCountries: [],
    activities: [],
    currentPage: 1,
    totalPages: 1,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DB_COUNTRIES:
        return {...state, countries: action.payload, allCountries: action.payload}
      
      case GET_ACTIVITIES:
        return {...state, activities: action.payload}
      
      case GET_COUNTRY_BY_NAME:
        return {...state, countries: action.payload};

      case FILTER_BY_CONTINENT:
        const allCountries = state.allCountries;
        const continentFiltered = action.payload === 'AllContinents' ? allCountries : allCountries.filter((country) => country.continents === action.payload)
        return {...state, countries: continentFiltered};

      case FILTER_BY_ACTIVITY:
        const allCountryActivities = state.allCountries;
        const filteredActivity = action.payload === 'AllActivities' ? allCountryActivities : allCountryActivities.filter((country) =>
        country.Activities.some((activity) => activity.type === action.payload));
        return { ...state, countries: filteredActivity };
      
      case ORDER_BY_NAME:
        const sortedCountries = action.payload === 'asc'
            ? state.countries.slice().sort((a, b) => a.name.localeCompare(b.name))
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
      
      case ADD_FAV:
          return { ...state, myFavorites: [...state.myFavorites, action.payload] };  
      
      case REMOVE_FAV:
          return {...state, myFavorites: state.myFavorites.filter((country) => country.id !== action.payload)};
      
      case SET_CURRENT_PAGE:
          return {...state, currentPage: payload,};
          
      default:
        return {...state};
    }
    
};

export default rootReducer;
