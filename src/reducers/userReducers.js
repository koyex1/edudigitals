import { USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET, USER_VERIFICATION_STATUS, USER_VERIFICATION_REQUEST, USER_VERIFICATION_FAIL, USER_PENDING_FAIL, USER_PENDING_SUCCESS, USER_PENDING_REQUEST, TUTOR_DETAILS_REQUEST, TUTOR_DETAILS_SUCCESS, TUTOR_DETAILS_FAIL, RECIPIENT_DETAILS_REQUEST, RECIPIENT_DETAILS_SUCCESS, RECIPIENT_DETAILS_FAIL, REVERIFICATION_DETAILS_FAIL, REVERIFICATION_DETAILS_SUCCESS, REVERIFICATION_DETAILS_REQUEST, IMAGE_CROP, HIDE_NAVBAR, REMEMBER_INFO, CANT_LOGIN} from "../constants/userConstants";



export const userSigninReducer = ( state = {}, action) => {
    switch (action.type){
        case USER_SIGNIN_REQUEST:
            return {loading: true};
         case USER_SIGNIN_SUCCESS:
             return {loading: false, userInfo: action.payload};
         case USER_SIGNIN_FAIL:
             return {loading: false, error: action.payload};
         case USER_SIGNOUT:
             return {};
         default:
             return state;
    } 
 }

 export const userRegisterReducer = ( state = {}, action) => {
    switch (action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true};
         case USER_REGISTER_SUCCESS:
             return {loading: false, userInfo: action.payload};
         case USER_REGISTER_FAIL:
             return {loading: false, error: action.payload};
       
         default:
             return state;
    } 
 }

 export const userVerifyReducer = ( state = {}, action) => {
    switch (action.type){
        case USER_VERIFICATION_REQUEST:
            return {loading: true};
         case USER_VERIFICATION_STATUS:
             return {loading: false, verifyMessage: action.payload};
         case USER_VERIFICATION_FAIL:
             return {loading: false, error: action.payload};
       
         default:
             return state;
    } 
 }

 export const userReverificationReducer = ( state = {}, action) => {
    switch (action.type){
        case REVERIFICATION_DETAILS_REQUEST:
            return {loading: true};
         case REVERIFICATION_DETAILS_SUCCESS:
             return {loading: false, verifyMessage: action.payload};
         case REVERIFICATION_DETAILS_FAIL:
             return {loading: false, error: action.payload};
       
         default:
             return state;
    } 
 }

 
 export const pendingUsersReducer = ( state = {}, action) => {
    switch (action.type){
        case USER_PENDING_REQUEST:
            return {loading: true};
         case USER_PENDING_SUCCESS:
             return {loading: false, pendingInfo: action.payload};
         case USER_PENDING_FAIL:
             return {loading: false, error: action.payload};
       
         default:
             return state;
    } 
 }

 export const tutorDetailsReducer = ( state = {}, action) => {
    switch (action.type){
        case TUTOR_DETAILS_REQUEST:
            return {loading: true};
         case TUTOR_DETAILS_SUCCESS:
             return {loading: false, tutorInfo: action.payload};
         case TUTOR_DETAILS_FAIL:
             return {loading: false, error: action.payload};
       
         default:
             return state;
    } 
 }

 export const recipientDetailsReducer = ( state = {}, action) => {
    switch (action.type){
        case RECIPIENT_DETAILS_REQUEST:
            return {loading: true};
         case RECIPIENT_DETAILS_SUCCESS:
             return {loading: false, recipientInfo: action.payload};
         case RECIPIENT_DETAILS_FAIL:
             return {loading: false, error: action.payload};
       
         default:
             return state;
    } 
 }

 export const imageCropReducer = ( state = {}, action) => {
    switch (action.type){
        case IMAGE_CROP:
             return  action.payload
         default:
             return state;
    } 
 }

 
 export const hideNavBarReducer = ( state = false, action) => {
    switch (action.type){
        case HIDE_NAVBAR:
             return  action.payload
         default:
             return state;
    } 
 }

 
 export const remeberInfoReducer = ( state = {}, action) => {
    switch (action.type){
        case REMEMBER_INFO:
             return  action.payload
         default:
             return state;
    } 
 }

 export const loginMessageReducer = ( state = '', action) => {
    switch (action.type){
        case CANT_LOGIN:
             return  action.payload
         default:
             return state;
    } 
 }