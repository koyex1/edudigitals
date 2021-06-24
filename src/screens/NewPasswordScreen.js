import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { passwordConfirmValidator } from '../validator/validator';
import { Alert, message } from 'antd';
import { sendChangePassword } from '../actions/tokenActions';


function NewPasswordScreen(props) {

    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [errorMessage, setErrorMessage] = useState('')
    const token = props.match.params.id

    

  const onFinish = () =>{
   if( passwordConfirmValidator(password, confirmPassword) ){
     message.info('passwords do not match')
     return;
   }
    sendChangePassword({token, password}).then(
      data=>{
        message.info(data.message)
      }
    )

  }


    return (
      
        <div className="sign_container">
          

      <div className="sign_form">
      {errorMessage && <div><Alert
          message={errorMessage}
          type="error"
           />
          <div className="edu_message_separator"> </div></div>}
      <div className="edu_form_header">Forgotten Password</div>

        
         
         
          <div >
            <div className="edu_form field_margin">
        <input onChange={e=>{setPassword(e.target.value)}} placeholder="New Password" type="password" />
        </div>
        <div className="edu_form field_margin">
        <input onChange={e=>{setConfirmPassword(e.target.value)}} placeholder="Confirm Password" type="password" />
        </div>
       
        
        
        <button onClick={onFinish} className="message_button change_color adjust_signin">Change Password
        </button>

        
          </div>


      </div>
    </div>
    )
}

export default NewPasswordScreen
