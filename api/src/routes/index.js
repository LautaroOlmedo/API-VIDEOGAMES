const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeGame = require('./videoGameRoute');
const routeGender = require('./genderRoute');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', routeGame);
router.use('/gender', routeGender);


module.exports = router;

// http://localhost:3001/videogames
// key=971fe86049bd4995bb327a8ebca359a7
// https://api.rawg.io/api/games/{id}?key=971fe86049bd4995bb327a8ebca359a7
// https://api.rawg.io/api/games?key=971fe86049bd4995bb327a8ebca359a7

// https://api.rawg.io/api/genres?key=971fe86049bd4995bb327a8ebca359a7
// https://api.rawg.io/api/games/{id}?key=971fe86049bd4995bb327a8ebca359a7