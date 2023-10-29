//?CREAMOS Y DEFINIMOS LOS CONTROLLERS Y LAS RUTAS

const { Router } = require("express"); //Módulo de express para crear y gestionr rutas

//Importación de controllers
const getApiData = require('../Store/data');
const getCountries = require("../controllers/getCountries");
const getCountryById = require("../controllers/getCountryById");
const postActivities = require("../controllers/postActvities");
const getActivities = require("../controllers/getActivities");
const login = require('../controllers/login');
const getActivitiesForCountry = require('../controllers/getActivityForCountry');
const postFavorites = require('../controllers/postFavorites');
const deleteFavorite = require('../controllers/deleteFavorite');

const router = Router(); //Creamos un enrutador o instancia de Router llamada router

//Definición de rutas
router.get("/login", login);
router.get("/store", getApiData)
router.get("/countries", getCountries);
router.get("/countries/:id", getCountryById)
router.post("/activities", postActivities);
router.get("/activities", getActivities);
router.get('/countries/:id/activities', getActivitiesForCountry);
router.post('/favorites', postFavorites);
router.delete('/favorites/:id', deleteFavorite);


module.exports = router;
