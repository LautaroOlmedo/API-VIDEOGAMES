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

export function getPlatforms(){
    return async(dispatch) =>{
        let data = await axios.get('http://localhost:3001/videogames/plataformas/1');
        return dispatch({
            type: 'BUY_PLATFORM',
            payload: data.data
        })
    }
};

export function getAllGenders(){
    return async(dispatch) =>{
        let data = await axios.get('http://localhost:3001/gender');
        return dispatch({
            type: 'BUY_GENDER',
            payload: data.data
        });
    };
};

export function getGameName(payload){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/videogames?name=' + payload);
            return dispatch({
                type: 'GET_GAME_NAME',
                payload: json.data
            })
        }catch (e){
            console.log(e)
        }
    }
};

export function postGame(payload){
    return async function(dispatch){
        try {
            var json = await axios.post('http://localhost:3001/videogames', payload);
            return json
        }catch(e){
            console.log(e);
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
       try {
        let json = await axios.get('http://localhost:3001/videogames/' + id);
        return dispatch({
            type: 'GAME_DETAIL',
            payload: json.data
        });
       }catch(e){
        console.log(e);
       };
    };
};

export function filterByGender(payload){
    return{
        type: 'FILTER_BY_GENDER',
        payload
    }
};

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
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
