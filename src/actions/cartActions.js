import { CART_LIST  } from "../constants/cartConstants";

export const cartList = ()=> async(dispatch) =>{
    const data = localStorage.getItem('edudigital_cart')?JSON.parse(localStorage.getItem('edudigital_cart')): []
    dispatch({type: CART_LIST, payload: data})
}


