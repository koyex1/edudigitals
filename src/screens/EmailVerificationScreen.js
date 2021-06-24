import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { validateEmail } from '../actions/tokenActions';

function EmailVerificationScreen(props) {
    const token = props.match.params.id;
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(validateEmail(token));
     
        setTimeout(()=>{
            props.history.push('/')
        }, 3000)
        
    }, [])


    return (
        <div>
            <div className="checkEmail_welcome">Verifying Email</div>
        </div>
    )
}

export default EmailVerificationScreen
