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
        value: 'Support',
        label: 'Support',
    },
    {
        value: 'Admin',
        label: 'Admin',
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



function AdminRegisterScreen() {

    const classes = useStyles();

    const [currency, setCurrency] = React.useState('');

    const handleChange = (event) => {
        setCurrency(event.target.value);
        setUser({ ...user, role: event.target.value});
    };

    //dispatch and receiving ends
    const dispatch = useDispatch()
    const userRegister = useSelector(state=>state.userRegister);
    const {userInfo, error} = userRegister;

    const [user, setUser] = useState({firstName: '', 
    lastName: '', email: '', password: '', role: '', language: '', 
    phoneNo: '', about: '', subjects: '', ratings: '', projectNos: '', 
    idCard: '', profilePicture: '', charge: '', video: '', verified: ''});

    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if(confirmPassword !== user.password){
            setErrorMessage('Incorrect entry');
        }else{
            setErrorMessage('');
        }
    }, [confirmPassword, user.password, setErrorMessage])

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
                    <TextField  onChange={e=> setUser({ ...user, phoneNo: e.target.value})}id="standard-basic" label="Phone Number" />
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
                   
                    <div className="about_container">
                    <label className="about_label">Profile Picture</label>
                    <div className="upload_container"><i className='bx bx-cloud-upload'></i><p>Upload File</p><input className="uploads" type="file" /></div>
                    </div>
                    
                    <div className="button_container">
                    <button onClick={submitHandler} className="submit">Submit</button>  
                    <MessageBox>{error}</MessageBox>
                    </div>                 

                </form>
            </div>
        </div>
    )
}

export default AdminRegisterScreen
