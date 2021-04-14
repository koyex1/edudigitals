import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { signin } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
        },
    },
}));

function SigninScreen(props) {
    const classes = useStyles();
    //for receiving
    //dispatch and select
    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo, error} = userSignin;

    //for sending out
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(signin(email, password))
    }
    useEffect(()=>{
    if(userInfo){
        userInfo && props.history.push('/');
    }
    

    },[props.history, userInfo])

    return (
        <div className="sign_container">
            <div className="welcome">
                Hi, We are glad you're here
            </div>
            <div className="sign_form">
                <div className="errorMessage"></div>
                <MessageBox></MessageBox>
                
                <form className={classes.root} noValidate autoComplete="off">
              
                    <TextField onChange={(e)=>{setEmail(e.target.value)}} id="standard-basic" label="Email" />
                    <TextField onChange={(e)=>{setPassword(e.target.value)}} id="standard-password-input" label="Password" type="password" autoComplete="current-password" />
                    
                    <div className="button_container">
                    <button onClick={submitHandler} className="submit">Submit</button>  
                    <div><Link to="/register"> Not Registered?</Link></div>
                    </div>                    

                </form>
            </div>
        </div>
    )
}

export default SigninScreen;
