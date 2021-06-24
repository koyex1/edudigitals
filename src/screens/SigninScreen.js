import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { signin } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { io } from 'socket.io-client';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import socket from '../Config/socketConfig'




function SigninScreen(props) {
  //for receiving
  //dispatch and select
  const dispatch = useDispatch()
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo, error } = userSignin;

  //for sending out
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(userSignin)



  const onFinish = () => {
    dispatch(signin(email, password))
  
  }

  useEffect(() => {
    
    if (userInfo && userInfo._id) {
      socket.emit('login', (userInfo._id));
        props.history.push('/');
    }
  }, [userSignin, userInfo, props])

  return (


    <div className="sign_container">

      <div className="sign_form">
      <div className="edu_form_header">Sign in  to Edudigitals</div>

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
        <Link to="/register"><div className="forgotten_password"> Register</div> </Link>

          </div>


      </div>
    </div>
  )
}

export default SigninScreen;
