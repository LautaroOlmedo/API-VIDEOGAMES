const axios = require('axios').default;
const db = require('../db');
const {Videogame, Gender} = require('../db');
const key = '971fe86049bd4995bb327a8ebca359a7'

// -------------------------

const apiInfoTotal = async () =>{
    try {
        let games = [];
        let page = 1;
        let countData = 100;
         while(games.length !== countData){
            let data1 = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=${page}`);
            games = [...games, ...data1.data.results];
            page ++;
        };
        games.flat(Infinity);
        const misGames = games.map(el =>{
            return {
                id: el.id,
                name: el.name,
                image: el.background_image,
                genres: el.genres.map(el => el.name),
                description: el.description,
                released: el.released,
                rating: el.rating,
                platforms: el.parent_platforms.map(el => el.platform.name)
            }
        });
        return misGames; 
    }catch(e){
        console.log(e);
    };
};

const dbVideoGameInfo = async () =>{
    try{
        const gameInDb = await Videogame.findAll({
            include: {
                model: Gender,
                attributes: ['name'],
                through:{
                    attributes: [],
                },
            }
        });
        let genres = []
        for(let i = 0; i < gameInDb[0].dataValues.genders.length; i++){
            genres.push( gameInDb[0].dataValues.genders[i].dataValues.name);
        };
        let gameInDbFinal = gameInDb.map(el =>{
            return {
            id: el.id,
            name: el.name,
            image: el.background_image,
            genres: genres,
            description: el.description,
            released: el.released,
            rating: el.rating,
            platforms: el.platforms,
            createdInDb: el.createdInDb
            }
        });
        if(gameInDbFinal) return gameInDbFinal;
        else return false;
    }catch(e){
        console.log(e);
    };
};


// ------------------------- MY API 

const getAllGames = async (req, res) => {
    try {
        let {rating, genres} = req.query;
        const apiInfo = await apiInfoTotal();
        const dbInfo = await dbVideoGameInfo();
        let infoTotal = apiInfo.concat(dbInfo);
        if(req.query){
            if(rating){
                infoTotal = infoTotal.filter((el) => el.rating == rating);
            };
            if(genres){
                infoTotal = infoTotal.filter((el) => el.genres.includes(genres));
            };
        };
        infoTotal ? res.status(200).json(infoTotal) : res.status(404).json({message: 'canot found video games'});
    }catch(e){
        console.log(e);
        res.status(500).json({message: 'Server error in getAllGames'});
    };
};

const getGameById = async (req, res) =>{
    try {
        const {id} = req.params
        if(!id) res.status(400).json({message: 'ID is not provided'});
        if(id.length == 36){
            const gameInDb = await Videogame.findOne({
                where: {
                    id: id
                },
                include: {
                    model: Gender,
                    attributes: ['name'],
                    through:{
                        attributes: [],
                    },
                }
            });
            let genres = []
            for(let i = 0; i < gameInDb.dataValues.genders.length; i++){
                genres.push( gameInDb.dataValues.genders[i].dataValues.name);
            };
            let gameInDbFinal = [gameInDb].map(el =>{
                return {
                id: el.id,
                name: el.name,
                image: el.background_image,
                genres: genres,
                description: el.description,
                released: el.released,
                rating: el.rating,
                platforms: el.platforms,
                createdInDb: el.createdInDb
                }
            });
            gameInDbFinal ? res.status(200).json(gameInDbFinal) : res.status(404).json({message: 'id not exists'});
        }else{
            console.log(id, 'este es mi id');
            const urlInfo = await (await axios.get(`https://api.rawg.io/api/games/${id}?key=${key}`)).data;
            const infoApi = [urlInfo];
            const infoFinal = infoApi.map(el => {
                return{
                        id: el.id,
                        name: el.name,
                        image: el.background_image,
                        genres: el.genres.map(el => el.name),
                        description: el.description,
                        released: el.released,
                        rating: el.rating,
                       platforms: el.parent_platforms.map(el => el.platform.name)
                    }
            })
            infoFinal ? res.status(200).json(infoFinal) : res.status(404).json({message: 'id not exists'});
        };  
    }catch(e){
        console.log(e);
        res.status(500).json({message: 'Server error in getGameById'});
    };
};

const createGame = async (req, res) =>{
    try{
        const {name, image, genres, description, released, rating, platforms} = req.body;
        if(!name || !genres || !description || !released || !rating || !platforms) return res.status(404).json({message: 'missing info'});
        if(!image) image = 'C:/Users/Lautaro.DESKTOP-PFAUVN7/Desktop/PI-VIDEOGAMESS/API-VIDEOGAMES/videogame.png';
        parseFloat(rating);
        if(rating < 1.0 || rating > 10.0) return res.status(404).json({message: 'rating only accepts values ​​between 1.0 and 10.0'});
        const validateGame = await Videogame.findOne({
            where: {
                name: name
            }
        });
        const validateGenres = await Gender.findAll({
            where: {
                name: genres
            }
        });
        if(!validateGame && validateGenres.length){
            const newGame = await Videogame.create({
                name, image, description, released, rating, platforms
            });

            const genresDb = await Gender.findAll({
                where: {name: genres}
            });
            newGame.addGender(genresDb);
            newGame ? res.json('Videogame created!') : res.json({message: 'error creating the video game'});
        }else{
            res.status(404).json({message: 'Video game already exists or unknow genres'});
        };  
    }catch(e){
        console.log(e);
        res.status(500).json({message: 'Server error in createGame'});
    };     
};

const updateGame = async (req, res) =>{
    try {
        let {name, image, description, released, rating, platforms, genres} = req.body; 
    } catch (e){
        console.log(e);
        res.status(500).json({message: 'Server errir in updateGame'})
    };
};

const deleteGame = async (req, res) =>{
    try {
        
    }catch(e){
        console.log(e);
        res.status(500).json({message: 'Server errir in deleteteGame'})  
    };
};

module.exports = { getAllGames, getGameById, createGame, apiInfoTotal};