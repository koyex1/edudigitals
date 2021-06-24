import { CART_LIST } from "../constants/cartConstants";

export const cartInfoReducer = ( state = [], action) => {
    switch (action.type){
        case CART_LIST:
            return action.payload
            
         default:
             return state;
    } 
 }