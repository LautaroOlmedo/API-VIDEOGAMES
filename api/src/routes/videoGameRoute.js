const {Router} = require('express');
const axios = require('axios').default;
const routeGame = Router();
const { allInfoGames, dbVideoGameInfo } = require('./controllers')
const {Videogame, Gender} = require('../db')

const key = '971fe86049bd4995bb327a8ebca359a7'
// -------------------- GET --------------------
routeGame.get('/', async(req, res) =>{
    const {name} = req.query;
    const allGames = await allInfoGames();
    try{
        if(name){
            const gameName = allGames.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            gameName.length ? res.status(200).json(gameName) : res.status(404).json(`El juego: ${name} no se ha encontrado`);
        }else{
            allGames.length ? res.status(200).json(allGames) : res.status(404).json('Juegos no encontrados')
        }  
    
    }catch(e){
        console.log(e);
        res.status(500).json('ERROR EN EL SERVIDOR /VIDEOGAMES')    
    };  
});


routeGame.get('/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        if(id.includes('-')){
            const dbInfo = await Videogame.findAll();
            const infoFinal = dbInfo.filter(el => el.id === id)
            infoFinal ? res.status(200).json(infoFinal) : res.status(404).json('VideoGame no encontrado');
        }else{
            const urlInfo = await (await axios.get(`https://api.rawg.io/api/games/${id}?key=${key}`)).data;
            const infoApi = [urlInfo];
            console.log(infoApi);
            const infoFinal = infoApi.map(el => {
                return{
                        id: el.id,
                        name: el.name,
                        image: el.background_image,
                        genders: el.genres.map(el => el.name),
                        description: el.description,
                        released: el.released,
                        rating: el.rating,
                       platforms: el.parent_platforms.map(el => el.platform.name)
                    }
            })
           infoFinal.length ? res.status(200).json(infoFinal) : res.status(404).json('ERROR LAUTAROOOOOO')
        };
    }catch (e) {
        res.status(500).json('ERROR EN EL SERVIDOR /GET/ID')
        console.log(e)   
    };
});

routeGame.get('/plataformas/1', async(req, res) =>{
    try {
        const allGames = await allInfoGames();
        
        const allGamesSemiFinal = allGames.map(el => el.platforms)
        const allGamesFinal = allGamesSemiFinal.flat(Infinity);
        const sinDuplciar = [... new Set(allGamesFinal)];
        //console.log(sinDuplciar);
        sinDuplciar ? res.status(200).json(sinDuplciar) : res.status(404).json('Plataformas no encontradas')
    } catch (error) {
        console.log(error)
    }
});

// -------------------- POST --------------------
routeGame.post('/', async (req, res) =>{
    const {name, description, rating, platforms, released, createdInDb, genders} = req.body;

    const verificationGame = await Videogame.findAll({
        where: {
            name: name,
            description: description, 
            rating: rating,
            platforms: platforms,
            released: released,
            createdInDb: createdInDb
        }
    });

    const verificationGender = await Gender.findAll({
    where: {name: genders}
    });

   if(verificationGender.length && verificationGame.length === 0){
        try{
            const newGame = await Videogame.create({
                name, description, rating, platforms, released, createdInDb
            });
            const genderDb = await Gender.findAll({
                where: {name: genders}
            })
            newGame.addGender(genderDb);
            newGame ? res.json('Videogame Creado') : res.json('error papa')
        }catch(e){
            console.log(e);
            res.status(404).json('Error al crear el juego');
        };
    }else{
        res.status(500).json('Genero desconocido / juego ya creado')
    }
});





module.exports = routeGame;
