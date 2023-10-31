import axios from "axios";

export const GET_DB_COUNTRIES = "GET_DB_COUNTRIES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// export const LOGOUT = "LOGOUT";


//?CONNECTION BACK AND FRONTEND
export function getDbCountries() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/countries');//Saqué {}
        return dispatch({
             type: 'GET_DB_COUNTRIES',
             payload: json.data
        })
    }   
};


//?GET ACTIVITIES
export function getActivities() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/activities');
        return dispatch({
             type: 'GET_ACTIVITIES',
             payload: json.data
        })   
    }   
};


//?POST ACTIVITY
export function postActivity(payload) {
    return async function (dispatch) {
        var response = await axios.post('http://localhost:3001/activities', payload)
        console.log(response)
        return dispatch({
            type: 'POST_ACTIVITY',
            payload: response.data
       }) 
    }
};
  

//? SEARCH BY NAME - SEARCHBAR
export function getCountryName(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/countries?name='+ name);//Saqué {}
        return dispatch({
             type: 'GET_COUNTRY_BY_NAME',
             payload: json.data
        })
        } catch (error) {
           alert('Country not found');
        }
        
    }   
};

//? SEARCH BY ID - SEARCHBAR
export function getCountryID(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/countries/'+ id);
        return dispatch({
             type: 'GET_COUNTRY_BY_ID',
             payload: json.data
        })
        } catch (error) {
            console.log(error)
        }
        
    }   
};

//? FILTERS
export function filterCountriesByContinent (payload) { //Payload=value del input
    return {
        type: 'FILTER_BY_CONTINENT',
        payload
    }
};

export function filterByActivity (payload) {
    return {
        type: 'FILTER_BY_ACTIVITY',
        payload
    }
};

export function orderByName (payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function orderByPopulation (payload) {
    return {
        type: 'ORDER_BY_POPULATION',
        payload
    }
};


//? COUNTRY DETAIL
export const getCountryDetail = (id) => {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/countries/${id}`);
            // console.log(json.data)
            return dispatch({
                type: 'GET_COUNTRY_DETAIL',
                payload: json.data,
                
            })
        } catch (error) {
            console.log(error)
        }
    }
  };
  


export const cleanDetail = () => {
    return {
        type: CLEAN_DETAIL
    }
};

export const addFav = (country) => {
    const endpoint = 'http://localhost:3001/favorites'
    return async (dispatch) => {
        try {
          const data = { country: country }; // para poder hacer el destructuring en el server
          const response = await axios.post(endpoint, data); //lo que cargo en el payload
          return dispatch({
            type: ADD_FAV,
            payload: response.data,
          });
        } catch (error) {
            console.error('Error al agregar favorito:', error);
          window.alert(error.message);
        }
      };
  };

export const removeFav = (id) => {
        return {
            type: REMOVE_FAV,
            payload: id
        }
};

export const setCurrentPage = (page) => {
    return (dispatch) => {
      dispatch({
        type: SET_CURRENT_PAGE,
        payload: page,
      });
    };
};

