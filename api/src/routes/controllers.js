const axios = require('axios').default;
const db = require('../db');
const {Videogame, Gender} = require('../db')
const key = '971fe86049bd4995bb327a8ebca359a7'


const apiInfoTotal = async () =>{
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
            gender: el.genres.map(el => el.name),
            description: el.description,
            released: el.released,
            rating: el.rating,
            platforms: el.parent_platforms.map(el => el.platform.name)
            
        }});
    return misGames;
};

const dbVideoGameInfo = async () =>{
    return await Videogame.findAll({
        include: {
            model: Gender,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        }
    });
};

const allInfoGames = async () => {
    const apiInfo = await apiInfoTotal();
    const dbInfo = await dbVideoGameInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};



// ----------------------------------------------------------------------------



const allGender = async () =>{
    const allGenderUrl = await axios.get('https://api.rawg.io/api/genres?key=971fe86049bd4995bb327a8ebca359a7');
    const allGenderInfo = allGenderUrl.data.results;
    const infoFinal = await Gender.bulkCreate(allGenderInfo);
};

module.exports = {allGender, allInfoGames, apiInfoTotal};