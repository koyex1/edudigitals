import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { cartInfoReducer } from './reducers/cartReducers';
import { contactReducer, messageNumberReducer, messageReducer } from './reducers/chatReducers';
import { searchReducer } from './reducers/searchReducers';
import {hideNavBarReducer, remeberInfoReducer, loginMessageReducer, imageCropReducer, pendingUsersReducer, recipientDetailsReducer, tutorDetailsReducer, userRegisterReducer, userReverificationReducer, userSigninReducer, userVerifyReducer } from './reducers/userReducers';



//combined initialstate
const initialState = {
    // initialstate that always sets usersignin to whats stored in the localstorage 
    //aswell as userrgeister information
    userSignin: {
        userInfo: localStorage.getItem('userInfo') //loacalStorage is the catch here
        ?JSON.parse(localStorage.getItem('userInfo'))//itemSet by both register and login
        :null,
    },
    cartInfo: localStorage.getItem('edudigital_cart')?JSON.parse(localStorage.getItem('edudigital_cart')): [],
    picture: null,
    hideNavBar: false,
    recallInfo: null,
    cantLogin: null
};

//combined reducer
const reducer = combineReducers({
  
    cartInfo: cartInfoReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    searchResult: searchReducer,
    verifyInfo: userVerifyReducer,
    reverifyInfo: userReverificationReducer,
    pendingResult: pendingUsersReducer,
    tutorResult: tutorDetailsReducer,
    recipientResult: recipientDetailsReducer,
    messageNo: messageNumberReducer,
    contacts: contactReducer,
    messages: messageReducer,
    picture: imageCropReducer,
    hideNavBar: hideNavBarReducer,
    recallInfo: remeberInfoReducer,
    cantLogin: loginMessageReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||  compose;

//USEREDUDCER ARCHITECTURE (REDUCER,INITIALSTATE)
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk)));

export default store;