import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { sendEmail } from '../actions/userActions';
import { message } from 'antd';


function ForgottenPasswordScreen() {

    const [email, setEmail] = useState()

  const onFinish = async() =>{
     let text = await sendEmail(email)
     message.info(text.message)

    
  }


    return (
        <div className="sign_container">

      <div className="sign_form">
      <div className="edu_form_header">Forgotten Password</div>

        
         
         
          <div >
            <div className="edu_form field_margin">
        <input onChange={e=>{setEmail(e.target.value)}} placeholder="Email" type="text" />
        </div>
       
        
        
        <button onClick={onFinish} className="message_button change_color adjust_signin">Send Email
        </button>

        
          </div>


      </div>
    </div>
    )
}

export default ForgottenPasswordScreen
