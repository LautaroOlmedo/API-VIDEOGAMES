const {Router} = require('express');
const axios = require('axios').default;
const routeGame = Router();
const { getAllGames, getGameById, getAllGamesPerPage, createGame, updateGame} = require('../controllers/videoGamesController')


const key = '971fe86049bd4995bb327a8ebca359a7'

routeGame.get('/', getAllGames);
routeGame.get('/page/:page', getAllGamesPerPage);
routeGame.get('/:id', getGameById);
routeGame.post('/', createGame);
routeGame.put('/:id', updateGame);




// routeGame.get('/gameInDb', dbVideoGameInfo);


module.exports = routeGame;
