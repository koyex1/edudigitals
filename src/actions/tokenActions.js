
import axios from "axios";
import { LOCALHOST } from "../constants/constants";
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstants";




export const validateEmail = (token) => async(dispatch) =>{
    try{
        const {data} = await axios.post(`${LOCALHOST}/api/users/validateEmail/${token}`)
        //action.type and action.payload
        dispatch({type: USER_SIGNIN_SUCCESS, payload:data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    }catch(error){
        //action.type and action.payload
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: //i put the error in status 404 library so the long process to get to it
            error.response && error.response.data.message
            ?error.response.data.message  //error from data i put intentionally
            : error.message,        //error if i forgot to put an error message intentionally
        }
        )
    }
    
    };

export const sendChangePassword = async (changeInfo) => {
    const {data} = await axios.post(`${LOCALHOST}/api/users/changePassAuth/`, changeInfo)
    console.log(data)
    return data;

}