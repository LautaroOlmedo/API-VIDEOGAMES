const {Router} = require('express');
const axios = require('axios').default;
const routePlatform = Router();
const { getAllPlatforms } = require('../controllers/platformsController')


const key = '971fe86049bd4995bb327a8ebca359a7'

routePlatform.get('/', getAllPlatforms);


// routeGame.get('/gameInDb', dbVideoGameInfo);


module.exports = routePlatform;