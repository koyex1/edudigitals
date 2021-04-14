import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';


const currencies = [
    {
        value: 'Tutor',
        label: 'Tutor',
    },
    {
        value: 'Student',
        label: 'Student',
    },

];

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
        },
    },
}));



function RegisterScreen(props) {

    const classes = useStyles();

    const [currency, setCurrency] = React.useState('');

    const handleChange = (event) => {
        setCurrency(event.target.value);
        setUser({ ...user, interestedRole: event.target.value});
    };

    //dispatch and receiving ends
    const dispatch = useDispatch()
    const userRegister = useSelector(state=>state.userRegister);
    const {userInfo, error} = userRegister;

    const [user, setUser] = useState({firstName: '', 
    lastName: '', email: '', password: '', interestedRole: '', language: '', 
    phoneNo: '', about: '', subjects: '', ratings: '', projectNos: '', 
    idCard: '', profilePicture: '', charge: '', video: '', verified: ''});

    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        // if(confirmPassword !== user.password){
        //     setErrorMessage('Incorrect entry');
        // }else{
        //     setErrorMessage('');
        // };
       if(userInfo){
           props.history.push('/')
       } 
    }, [userInfo,props.history, confirmPassword, user.password, setErrorMessage])

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(register(user));
    }
    

    return (
        <div className="sign_container">
            <div className="welcome">
                Hi, We are glad you're here
            </div>
            <div className="sign_form">
            
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField onChange={e=> setUser({ ...user, firstName: e.target.value})} id="standard-basic" label="First Name" />
                    <TextField onChange={e=> setUser({ ...user, lastName: e.target.value})}  id="standard-basic" label="Last Name" />
                    <TextField onChange={e=> setUser({ ...user, email: e.target.value})}  id="standard-basic" label="Email" />
                    <TextField onChange={e=> setUser({ ...user, password: e.target.value})} id="standard-password-input" label="Password" type="password" autoComplete="current-password" />
                    <TextField onChange={e=> setConfirmPassword(e.target.value)}  id="standard-password-input" label={errorMessage || "Confirm Password"} type="password" autoComplete="current-password" />
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Select"
                        value={currency}
                        onChange={handleChange}
                        helperText="Please select your role"
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField  onChange={e=> setUser({ ...user, language: e.target.value})} id="standard-basic" label="language" />
                    <TextField  onChange={e=> setUser({ ...user, country: e.target.value})} id="standard-basic" label="country" />
                    <TextField  onChange={e=> setUser({ ...user, phoneNo: e.target.value})}id="standard-basic" label="Phone Number" />
                    <div className="about_container">
                    <label className="about_label">About</label>
                    <textarea  onChange={e=> setUser({ ...user, about: e.target.value})} cols="100"></textarea>
                    </div>
                    <TextField   onChange={e=> setUser({ ...user, subjects: e.target.value})} id="standard-basic" label="subjects" />
                    <TextField
                        onChange={e=> setUser({ ...user, charge: e.target.value})}
                        id="standard-number"
                        label="Charge"
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                    />
                    <div className="about_container">
                    <label className="about_label">Profile Picture</label>
                    <div className="upload_container"><i className='bx bx-cloud-upload'></i><p>Upload File</p><input className="uploads" type="file" /></div>
                    </div>
                    <div className="about_container">
                    <label className="about_label">Identification Card</label>
                    <div className="upload_container"><i className='bx bx-cloud-upload'></i><p>Upload File</p><input className="uploads" type="file" /></div>
                    </div>
                    
                    <div className="button_container">
                    <button onClick={submitHandler} className="submit">Submit</button>  
                    <MessageBox>{error}</MessageBox>
                    <div><Link to="/signin">Already Registered?</Link></div>
                    </div>                 

                </form>
            </div>
        </div>
    )
}

export default RegisterScreen
