import actionTypes from "./actionTypes";

export function reducer(state,action){
  switch (action.type){
    case actionTypes.CHANGE_PRICE : {
      
      return {
        ...state,
        minPrice : action.payload
      }
    }

    case actionTypes.CHANGE_CATEGORIE : {
      
      return {
        ...state,
        category : action.payload
      }
    }

    default:
      return state;
  }

}