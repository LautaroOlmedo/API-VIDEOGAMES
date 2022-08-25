const initialState = {
    videoGames: [],
    allVideoGames: [],
   
};

export default function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_ALL':
            return{
                ...state,
                videoGames: action.payload,
                allVideoGames: action.payload

            }
        case 'FILTER_BY_RATING':
            return{
                ...state
            }
        case 'FILTER_BY_CREATED':
            
            const createdFilter = action.payload === 'crea' ? state.allVideoGames.filter(el => el.createdInDb) : state.allVideoGames.filter(el => !el.createdInDb)
            return{
                ...state,
                videoGames: action.payload === 'all' ? state.allVideoGames : createdFilter
            }
        default:
            return{...state}
    }
  
};
