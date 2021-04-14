import axios from "axios";
import { USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_VERIFICATION_REQUEST, USER_VERIFICATION_FAIL, USER_VERIFICATION_STATUS, USER_SIGNIN_REQUEST, USER_SIGNOUT, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_SUCCESS, USER_PENDING_REQUEST, USER_PENDING_SUCCESS, USER_PENDING_FAIL, TUTOR_DETAILS_REQUEST, TUTOR_DETAILS_SUCCESS, TUTOR_DETAILS_FAIL } from "../constants/userConstants";

export const signin = (email, password) => async(dispatch) =>{
dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
try{
    const {data} = await axios.post('/api/users/signin',{email, password});
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

export const signout = ()=> async(dispatch) =>{
    localStorage.removeItem('userInfo');
    dispatch({type: USER_SIGNOUT})
}

export const register = (userRegister) => async(dispatch) =>{
    dispatch({type: USER_REGISTER_REQUEST})
    try{
        const {data} = await axios.post('/api/users/register', userRegister)
        console.log(data);
        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data));
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
    const {data} = await axios.put(`/api/users/verify/${id}`, {status})
        console.log(data);
        dispatch({type: USER_VERIFICATION_STATUS, payload: data})

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
        const {data} = await axios.get('/api/users/pendingusers')
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
        const {data} = await axios.get(`/api/users/${id}`)
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

