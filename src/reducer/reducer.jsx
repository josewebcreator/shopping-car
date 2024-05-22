import actionTypes from "./actionTypes";

export function reducer(state,action){
  switch (action.type){

    case actionTypes.ADD_TO_CAR : {
      const productId = action.payload.id;
      const product = action.payload;

      //validamos si el producto ya esta en el carrito
      const existingProductIndex = state.onCar.findIndex(item => item.id === productId);

      if(existingProductIndex!==-1){
        //Si existe hacemos una copia auxiliar del carro
        const updatedOnCar = [...state.onCar];
        updatedOnCar[existingProductIndex].amount += 1;
        console.log(updatedOnCar[existingProductIndex].amount);

        return{
          ...state,
          onCar : updatedOnCar
        }
      }else{
        //si no existe lo agregamos al carrito
        return{
          ...state,
          onCar : [...state.onCar, product]
        }
      }
    }

    case actionTypes.LOAD_MORE_PRODUCTS : {
      return {
        ...state,
        limit : action.payload
      }
    }

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