import axios from 'axios';

export function getAllGames(){
    return async(dispatch) =>{ 
        let data = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: 'GET_ALL',
            payload: data.data
        });  
    };
};

export function filterByRating(payload){
    return{
        type: 'FILTER_BY_RATING',
        payload
    }
    
}

export function filterCreated(payload){
    return{
        type: 'FILTER_BY_CREATED',
        payload
    }
}
