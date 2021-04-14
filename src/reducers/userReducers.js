import { USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET, USER_VERIFICATION_STATUS, USER_VERIFICATION_REQUEST, USER_VERIFICATION_FAIL, USER_PENDING_FAIL, USER_PENDING_SUCCESS, USER_PENDING_REQUEST, TUTOR_DETAILS_REQUEST, TUTOR_DETAILS_SUCCESS, TUTOR_DETAILS_FAIL} from "../constants/userConstants";



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