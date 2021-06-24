import { CONTACTS, NEW_MESSAGE, MESSAGES } from "../constants/chatConstants";

export const messageNumberReducer = ( state = 0, action) => {
    switch (action.type){
        case NEW_MESSAGE:
            return action.payload
            
         default:
             return state;
    } 
 }

 export const contactReducer = ( state=[], action) => {
    switch (action.type){
        case CONTACTS:
            return action.payload
            
         default:
             return state;
    } 
 }

 export const messageReducer = ( state=[], action) => {
    switch (action.type){
        case    MESSAGES:
            return action.payload
            
         default:
             return state;
    } 
 }