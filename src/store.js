import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { searchReducer } from './reducers/searchReducers';
import {pendingUsersReducer, tutorDetailsReducer, userRegisterReducer, userSigninReducer, userVerifyReducer } from './reducers/userReducers';



//combined initialstate
const initialState = {
    // initialstate that always sets usersignin to whats stored in the localstorage 
    //aswell as userrgeister information
    userSignin: {
        userInfo: localStorage.getItem('userInfo') //loacalStorage is the catch here
        ?JSON.parse(localStorage.getItem('userInfo'))//itemSet by both register and login
        :[],
    }
};

//combined reducer
const reducer = combineReducers({
  
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    searchResult: searchReducer,
    verifyInfo: userVerifyReducer,
    pendingResult: pendingUsersReducer,
    tutorResult: tutorDetailsReducer,
    
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||  compose;

//USEREDUDCER ARCHITECTURE (REDUCER,INITIALSTATE)
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk)));

export default store;