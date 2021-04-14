import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
        },
    },
}));

function ForgottenPasswordScreen() {

    const classes = useStyles();


    return (
        <div className="sign_container">
        <div className="welcome">
            Hi, We are glad you're here
        </div>
        <div className="sign_form">
            <form className={classes.root} noValidate autoComplete="off">
          
                <TextField id="standard-basic" label="Email" />
                
                <div className="button_container">
                <button className="submit">Submit</button>  
                </div>                    

            </form>
        </div>
    </div>
    )
}

export default ForgottenPasswordScreen
