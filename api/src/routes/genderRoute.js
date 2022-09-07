const {Router} = require('express');
const axios = require('axios').default;
const routeGender = Router();
const {Gender} = require('../db');


// -------------------- GET --------------------
routeGender.get('/', async(req, res) =>{
    try{
        const allGenders = await Gender.findAll();
        allGenders ? res.status(200).json(allGenders.map(el => el.name)) : res.status(404).json('Generos no encontrados');
    }catch (e){
        console.log(e);
        res.status(500).json('ERROR EN EL SERVIDOR /Gender')
    };  
})

module.exports = routeGender;