const axios = require('axios').default;
const db = require('../db');
const {Gender} = require('../db')
const key = '971fe86049bd4995bb327a8ebca359a7'


const getAllGender = async () =>{
    try {
        const validate = await Gender.findOne({  // este validate lo utilizo porque me pareció que optimizaba el codigo frente a un findOrCreate
            where: {
            name: "Action",
            },
        });
       if(!validate){
          const allGenderUrl = await axios.get(`https://api.rawg.io/api/genres?key=${key}`);
          const allGenderInfo = await allGenderUrl.data.results;
          await Gender.bulkCreate(allGenderInfo);
        }
        return false;
    }catch(e){
      console.log(e);
    };
};

const getAllGender2 = async (req, res) =>{
  try {
    let genres = await Gender.findAll();
    let genresArray = [];
    console.log(genres);
    console.log(genres.length);
    for(let i = 0; i < genres.length; i++){
      genresArray.push(genres[i].dataValues.name);
    };
    console.log(genresArray);
    genresArray ? res.status(200).json(genresArray) : res.status(404).json({message: 'canot found genres'});
  }catch(e){
    console.log(e);
    res.status(500).json({message: 'Server error in getAllGender2'})
  };
};

module.exports = {getAllGender, getAllGender2}