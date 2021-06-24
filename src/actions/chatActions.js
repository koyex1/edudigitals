import { NEW_MESSAGE, CONTACTS, MESSAGES } from "../constants/chatConstants"

export const  newMessage= (data) => async(dispatch) =>{
    console.log('chat action ' + data)
    dispatch({type: NEW_MESSAGE, payload: data})
}

export const  contactList= (data) => async(dispatch) =>{
    console.log('chat action ' + data)
    dispatch({type: CONTACTS, payload: data})
}
export const  messageList= (data) => async(dispatch) =>{
    console.log('chat action ' + data)
    dispatch({type: MESSAGES, payload: data})
}
