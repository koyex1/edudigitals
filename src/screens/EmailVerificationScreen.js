import { Spin } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { validateEmail } from '../actions/tokenActions';
import { hideNavBar } from '../actions/userActions';

function EmailVerificationScreen(props) {
    const token = props.match.params.id;
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(validateEmail(token));
        dispatch(hideNavBar(true))
        setTimeout(()=>{
            props.history.push('/')
        }, 3000)
        return () => {
            dispatch(hideNavBar(false))
        }
    }, [])




    return (
        <div  className="checkEmail_welcome">
        <div className="checkEmail_welcome_text"> <Spin/> Verifying email...</div>
    </div>
    )
}

export default EmailVerificationScreen
