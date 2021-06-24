import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import { Link } from 'react-router-dom';
import {message,  Alert, } from 'antd';





function AdminSigninScreen(props) {
    //for receiving
    //dispatch and select
    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo, error} = userSignin;

    //for sending out
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    

    const onFinish = (e)=>{
        e.preventDefault();
        dispatch(signin(email, password))
    }
    useEffect(()=>{
        if(userInfo){
           
        }
    }
        ,[props.history, userInfo])

    return (
        <div className="sign_container">

      <div className="sign_form">
      <div className="edu_form_header">Admin/Support Login</div>

        {error && <div><Alert
          message={error}
          type="error"
           />
          <div className="edu_message_separator"> </div></div>}
         
         
          <div >
            <div className="edu_form field_margin">
        <input onChange={e=>{setEmail(e.target.value)}} placeholder="Email" type="text" />
        </div>
        <div className="edu_form">
        <input onChange={e=>{setPassword(e.target.value)}} placeholder="Password" type="password" />
        </div>
        
        
        <button onClick={onFinish} className="message_button change_color adjust_signin">Sign In</button>

        <div className="flex_or">
          <hr className="reduce_line"/>
          <div>OR</div> 
          <hr className="reduce_line"/>
        </div>

        <Link to="/forgottenpassword"><div className="forgotten_password"> Forgotten Password</div> </Link>
        <div className="flex_or">
          <hr className="reduce_line"/>
          <div>OR</div> 
          <hr className="reduce_line"/>
        </div>
        <Link to="/forgottenpassword"><div className="forgotten_password"> Register</div> </Link>

          </div>


      </div>
    </div>
    )
}

export default AdminSigninScreen;
