const {Router} = require('express');
const axios = require('axios').default;
const routeGenre = Router();
const {getAllGender, getAllGender2} = require('../controllers/gendersController')


const key = '971fe86049bd4995bb327a8ebca359a7'

routeGenre.get('/', getAllGender2);

// routeGame.get('/gameInDb', dbVideoGameInfo);


module.exports = routeGenre;
