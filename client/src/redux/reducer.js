const initialState = {
    videoGames: [],
    allVideoGames: [],
    nextGames: [],
    platforms: [],
    genders: [],
    allGenders: [],
    detail: [],
    
};

export default function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_ALL':
            return{
                ...state,
                videoGames: action.payload,
                allVideoGames: action.payload
            }
        case 'GET_NEXT_GAMES':
            return{
                ...state,
                nextGames: action.payload
            }
        case 'FILTER_BY_CREATED':
            
            const createdFilter = action.payload === 'crea' ? state.allVideoGames.filter(el => el.createdInDb) : state.allVideoGames.filter(el => !el.createdInDb)
            return{
                ...state,
                videoGames: action.payload === 'all' ? state.allVideoGames : createdFilter
            }
        case 'BUY_PLATFORM':
            return{
                ...state,
                platforms: action.payload
            }
        case 'ORDER_BY_NAME':
            const sortedArr = action.payload === 'asc' ?
            state.videoGames.sort(function(a, b){
                if(a.name > b.name){ 
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.videoGames.sort(function(a, b){
                if(a.name > b.name){ 
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0
            })
            return{
                ...state,
                videoGames: action.payload === 'default' ? state.allVideoGames : sortedArr
            }
            case 'FILTER_BY_RATING':
                const gamesRating =
                action.payload === "Rasc"
                ? state.allVideoGames.sort((a, b) => {
                if (a.rating > b.rating) {
                return 1;
                }
                if (b.rating > a.rating) {
                return -1;
                }
                return 0;
               })
               : state.allVideoGames.sort((a, b) => {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videoGames: gamesRating,
      };
            case 'BUY_GENDER':
                return{
                    ...state,
                    genders: action.payload,
                    allGenders: action.payload
                }
            case 'FILTER_BY_GENDER':
                let miGender = []
                if(action.payload === 'All'){
                    miGender = state.allVideoGames
                
                }else{
                    miGender = state.allVideoGames.filter((g) =>{
                        return g.genders.find((gender) =>{
                            return gender === action.payload
                        })
                    });  
                };
                return{
                    ...state,
                    videoGames: miGender
                }
            case 'GET_GAME_NAME':
                return{
                    ...state,
                    videoGames: action.payload
                }
            case 'POST_GAME':
                return{
                    ...state
                }
            case 'GAME_DETAIL':
                return{
                    ...state,
                    detail: action.payload
                }
        default:
            return{...state}
    }
  
};
