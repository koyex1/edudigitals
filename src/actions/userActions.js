import axios from "axios";
import { LOCALHOST } from "../constants/constants";
import { USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, REMEMBER_INFO, USER_VERIFICATION_REQUEST, USER_VERIFICATION_FAIL, USER_VERIFICATION_STATUS, USER_SIGNIN_REQUEST, USER_SIGNOUT, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_SUCCESS, USER_PENDING_REQUEST, USER_PENDING_SUCCESS, USER_PENDING_FAIL, TUTOR_DETAILS_REQUEST, TUTOR_DETAILS_SUCCESS, TUTOR_DETAILS_FAIL, REVERIFICATION_DETAILS_REQUEST, REVERIFICATION_DETAILS_SUCCESS, REVERIFICATION_DETAILS_FAIL, RECIPIENT_DETAILS_FAIL, RECIPIENT_DETAILS_SUCCESS, RECIPIENT_DETAILS_REQUEST, IMAGE_CROP, HIDE_NAVBAR, CANT_LOGIN } from "../constants/userConstants";



export const signin = (email, password) => async(dispatch) =>{
dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
try{
    const {data} = await axios.post(`${LOCALHOST}/api/users/signin`,{email, password});
		//action.type and action.payload
    dispatch({type: USER_SIGNIN_SUCCESS, payload:data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    console.log(data);
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

export const signout = ()=> async(dispatch) =>{
    localStorage.removeItem('userInfo');
    dispatch({type: USER_SIGNOUT})
}

//userRegister
export const register = (myData) => async(dispatch) =>{
    dispatch({type: USER_REGISTER_REQUEST})
    try{
        
        const {data} = await axios.post(`${LOCALHOST}/api/users/register`, myData)
        console.log(data);
        dispatch({type: USER_REGISTER_SUCCESS, payload: data.message})
    }
    catch(error){
        dispatch({type: USER_REGISTER_FAIL,
        payload: //i put the error in status 404 library so the long process to get to it
        error.response && error.response.data.message
        ?error.response.data.message  //error from data i put intentionally
        : error.message,        //error if i forgot to put an error message intentionally
        })
    }
}

export const userVerify = (status, id) => async(dispatch) =>{
    dispatch({type: USER_VERIFICATION_REQUEST})
    try{
    const {data} = await axios.put(`${LOCALHOST}/api/users/verify/${id}`, {status})
        console.log(data)
        localStorage.setItem('userInfo', JSON.stringify(data.userDetail));
       // const info =localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):[]
        dispatch({type: USER_VERIFICATION_STATUS, payload: data})
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data.userDetail})

    }
    catch(error){
        dispatch({type: USER_VERIFICATION_FAIL,
        payload: //i put the error in status 404 library so the long process to get to it
        error.response && error.response.data.message
        ?error.response.data.message  //error from data i put intentionally
        : error.message,        //error if i forgot to put an error message intentionally
        })
    }
}


export const  pendingUsers= () => async(dispatch) =>{
    dispatch({type: USER_PENDING_REQUEST})
    try{
        const {data} = await axios.get(`${LOCALHOST}/api/users/pendingusers`)
        
        dispatch({type: USER_PENDING_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: USER_PENDING_FAIL,
        payload: //i put the error in status 404 library so the long process to get to it
        error.response && error.response.data.message
        ?error.response.data.message  //error from data i put intentionally
        : error.message,        //error if i forgot to put an error message intentionally
        })
    }
}

export const  tutorDetails= (id) => async(dispatch) =>{
    dispatch({type: TUTOR_DETAILS_REQUEST})
    try{
        const {data} = await axios.get(`${LOCALHOST}/api/users/${id}`)
        dispatch({type: TUTOR_DETAILS_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: TUTOR_DETAILS_FAIL,
        payload: //i put the error in status 404 library so the long process to get to it
        error.response && error.response.data.message
        ?error.response.data.message  //error from data i put intentionally
        : error.message,        //error if i forgot to put an error message intentionally
        })
    }
}

export const  recipientDetails= (id) => async(dispatch) =>{
    dispatch({type: RECIPIENT_DETAILS_REQUEST})
    try{
        const {data} = await axios.get(`${LOCALHOST}/api/users/${id}`)
        dispatch({type: RECIPIENT_DETAILS_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: RECIPIENT_DETAILS_FAIL,
        payload: //i put the error in status 404 library so the long process to get to it
        error.response && error.response.data.message
        ?error.response.data.message  //error from data i put intentionally
        : error.message,        //error if i forgot to put an error message intentionally
        })
    }
}

export const  reverify= (id, info) => async(dispatch) =>{
    dispatch({type: REVERIFICATION_DETAILS_REQUEST})
    try{
        const {data} = await axios.post(`${LOCALHOST}/api/users/reverify/${id}`, info)
        localStorage.setItem('userInfo', JSON.stringify(data.userDetail));
        dispatch({type: REVERIFICATION_DETAILS_SUCCESS, payload: data})
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data.userDetail})


    }
    catch(error){
        dispatch({type: REVERIFICATION_DETAILS_FAIL,
        payload: //i put the error in status 404 library so the long process to get to it
        error.response && error.response.data.message
        ?error.response.data.message  //error from data i put intentionally
        : error.message,        //error if i forgot to put an error message intentionally
        })
    }
}



export const  addToBookmark = async (bookedId,userId) => {
    const {data} = await axios.post(`${LOCALHOST}/api/bookmark/add/${userId}`, {bookedId})
    console.log(data)
    return data;

}

export const  getBookmarked = async (userId) => {
    const {data} = await axios.get(`${LOCALHOST}/api/bookmark/get/${userId}`)
    return data;

}

export const  removeUser = async (id, userId) => {
    const {data} = await axios.delete(`${LOCALHOST}/api/bookmark/delete/${userId}`, {data: {id}})
    return data;

}


export const  updateInfo = async (id, editedInfo) => {
    console.log(id)
    const {data} = await axios.put(`${LOCALHOST}/api/users/editprofile/${id}`, {editedInfo})
    console.log(data)
    return data;
}

export const  updateImage = async (id, image) => {
    console.log(id)
    const {data} = await axios.put(`${LOCALHOST}/api/users/upload/${id}`, image)
    console.log(data)
    return data;
}

export const  sendEmail = async (email) => {
    const {data} = await axios.post(`${LOCALHOST}/api/users/sendEmail`, {email})
    console.log(data)
    return data;

}

export const  updatePassword = async (userId, passwords) => {
    const {data} = await axios.put(`${LOCALHOST}/api/users/changePassword/${userId}`, passwords)
    console.log(data)
    return data;

}

export const  ImageCrop = (picture) => async(dispatch) =>{
    dispatch({type: IMAGE_CROP, payload: picture})

}

export const  hideNavBar = (hide) => async(dispatch) =>{
    dispatch({type: HIDE_NAVBAR, payload: hide})

}

export const  rememberInfo = (info) => async(dispatch) =>{
    dispatch({type: REMEMBER_INFO, payload: info})

}

export const  loginMessage = (message) => async(dispatch) =>{
    dispatch({type: CANT_LOGIN, payload: message})

}
