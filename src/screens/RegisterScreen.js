import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { hideNavBar, ImageCrop, register, rememberInfo } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import Axios from "axios";
import {
  Form, Input, Button, Select, InputNumber, Switch, Radio,
  Slider, Upload, Rate, Checkbox, Row, Col, Alert, message,
} from 'antd';
import { UserOutlined, FileDoneOutlined, UserAddOutlined, ContainerOutlined, MailFilled, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { languages, countryList, roles } from '../data/data';
import { alphabetValidator, emailValidator, emptyValidator, imageValidator, passwordConfirmValidator } from '../validator/validator';
import { Fragment } from 'react';
import CropImage from '../components/cropImage/CropImage';
const { Option } = Select;


function RegisterScreen(props) {
  //dispatch and receiving ends
  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister);
  const picture = useSelector(state => state.picture);
  const recallInfo = useSelector(state => state.recallInfo);

  
  const { userInfo, error } = userRegister;
 // const [picture , setPicture] = useState()
  const [identification , setIdentification] = useState()
  const [user, setUser] = useState({
    firstName: '', lastName: '', email: '', password: '', interestedRole: '', country: '',
    phoneNo: '', about: '', rating: '', charge: '',  verified: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [currency, setCurrency] = useState('');
  const [confirmed, setConfirmed] = useState(true)
  const [preview1, setPreview1] = useState(false)
  const [preview2, setPreview2] = useState(false)
  const [language, setLanguage] = useState([''])
  //const [myLanguages, setMyLanguages] = useState([0])
  const [subject, setSubject] = useState([''])
  //const [mySubjects, setMySubjects] = useState([0])
  const [lag, setLag] = useState();

  const inputRef = useRef();



  

  //------- CLICK ACTION
  const submitHandler = () => {
    if(emptyValidator(user.firstName)){
      message.info('Enter First Name')
      return;
  }
  if(alphabetValidator(user.firstName)){
    message.info('First Name should not have special characters')
    return
  }
  if(emptyValidator(user.lastName)){
    message.info('Enter Last Name')
    return;
}
if(alphabetValidator(user.lastName)){
  message.info('Last Name should not have special characters')
  return
}
if(emailValidator(user.email)){
  message.info('invalid email')
  return;
}
if(emptyValidator(user.password)){
  message.info('Enter Password')
  return;
}
if(passwordConfirmValidator(user.password, confirmPassword)){
  message.info('Confirm Password')
  return;
}
if(emptyValidator(confirmPassword)){
  message.info('Confirm Password')
  return;
}
if(emptyValidator(user.interestedRole)){
  message.info('Enter Role')
  return;
}

for(let x in language){
  let languageNo = parseInt(x)+1;
  if(emptyValidator(language[x])){
    message.info('Enter Subject ' + languageNo)
    return;
}
  if(alphabetValidator(language[x])){
    message.info('Language ' + languageNo + ' should contain only alphabets')
    return
  }

}
if(emptyValidator(user.country)){
  message.info('Enter country')
  return;
}
if(emptyValidator(user.charge)){
  message.info('Enter your Charge')
  return;
}
if(emptyValidator(user.phoneNo)){
  message.info('Enter your Phone Number')
  return;
}
for(let x in subject){
  let subjectNo = parseInt(x)+1;
  if(emptyValidator(subject[x])){
    message.info('Enter Subject ' + subjectNo)
    return;
}
  if(alphabetValidator(subject[x])){
    message.info('Subject ' + subjectNo + ' should contain only alphabets')
    return
  }

}
if(emptyValidator(user.about)){
  message.info('Enter something about you')
  return;
}
if(imageValidator(picture)){
  message.info('Upload Profile Picture')
  return;
} 

if(imageValidator(preview2)){
  message.info('Upload identification card')
  return;
}

    let myData = new FormData()
    myData.append('file', picture)
    myData.append('file2', identification)
    myData.append('user', JSON.stringify(user))
    myData.append('language', language)
    myData.append('subject', subject)

    console.log(user)
    
    Axios.post('https://httpbin.org/anything', myData).then(res=>console.log(res));
    dispatch(register(myData));
    if(error){
      message.info(error)
    }
  }

  const uploadProfilePicture = (e) => {
    if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.addEventListener("load", () => {
        dispatch(ImageCrop(reader.result))
			});
		}
dispatch(hideNavBar(true))
  };

  const uploadIdCard = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0])
      setIdentification(e.target.files[0])
        setPreview2(true)
		}
    else{
      setPreview2(false)

    }
   
  };
  useEffect(() => {
    if(recallInfo){
    setUser(recallInfo.user)
    setLanguage(recallInfo.language)
    setSubject(recallInfo.subject)
    setIdentification(recallInfo.identification)}
    return () => {
      dispatch(hideNavBar(false))
      dispatch(ImageCrop(null))
      dispatch(rememberInfo(null))


    }
  }, [])

  useEffect(() => {
    dispatch(rememberInfo({user, confirmPassword, language, subject, identification}))
    
  }, [confirmPassword, dispatch, identification, language, subject, user])

console.log('recallInfo')
console.log(recallInfo)
  //-------USE EFFECT

  useEffect(() => {
  
    if (userInfo && userInfo._id) {
      props.history.push('/checkEmail')    }
  }, [userInfo, props.history])




  const handleAddLanguage = () => {
    setLanguage([...language, ''])
}
const handleRemoveLanguage = (i)=>(e)=> {
    setLanguage(prev=>prev.filter((x,index)=> index!=i))
}
const handleChangeLanguage = (i)=>(e)=> {
    language[i] = e.target.value
    setLanguage([...language])

}


const handleAddSubject = () => {
  setSubject([...subject, ''])

}
const handleRemoveSubject = (i)=>(e)=> {

  setSubject(prev=>prev.filter((x,index)=> index!=i))


}
const handleChangeSubject = (i)=>(e)=> {

  subject[i] = e.target.value
  setSubject([...subject])


}
// console.log('after add or removing language')
// console.log(myLanguages)
// console.log('languages selected')
// console.log(language)
// console.log('after add or removing subject')
// console.log(mySubjects)
// console.log('subjects selected')
// console.log(subject)

const triggerFileSelectPopup = () => {
  inputRef.current.click();
  console.log(inputRef.current)
}
console.log('language')
console.log(language)
console.log('subject')
console.log(subject)
console.log('recallInfo')
console.log(recallInfo)

  return (
    <>
   { picture && !picture.name?
   <CropImage triggerFileSelectPopup={triggerFileSelectPopup} />
   :
    <div className="sign_container">

      <div className="sign_form">
      <div className="edu_form_header">Sign Up to Edudigitals</div>   
          <div >
            <div className="edu_form field_margin">
        <input defaultValue={user && user.firstName} onChange={e => setUser({ ...user, firstName: e.target.value })} placeholder="FirstName" type="text" />
        </div>
        <div className="edu_form field_margin">
        <input defaultValue={user && user.lastName} onChange={e => setUser({ ...user, lastName: e.target.value })} placeholder="LastName" type="text" />
        </div>
        <div className="edu_form field_margin">
        <input defaultValue={user && user.email} onChange={e => setUser({ ...user, email: e.target.value })}placeholder="Email" type="email" />
        </div>
        <div className="edu_form field_margin">
        <input defaultValue={user && user.password} onChange={e => setUser({ ...user, password: e.target.value })} placeholder="Password" type="password" />
        </div>
        <div className="edu_form field_margin">
        <input defaultValue={confirmPassword} onChange={e =>{ setConfirmPassword(e.target.value)}} placeholder="Confirm Password" type="password" />
        </div>

        <div className="register_select">
        <select value={user && user.interestedRole} className="edu_form field_margin" onChange={e => setUser({ ...user, interestedRole: e.target.value })}>
        <option value=''>Select a Role</option>
         {roles.map((role)=>(<option value={role}>{role}</option>) )}
        </select>
        
        {/* languages*/}
        {language && language.map((x,i)=>
        <Fragment key={i}>
        <select value={x} className="edu_form " onChange={handleChangeLanguage(i)}>
        <option value=''>Select a Language {i+1}</option>
         {languages.map((language)=>(<option value={language}>{language}</option>) )}
        </select>
        <div onClick={handleRemoveLanguage(i)} className={language.length>1?"removeMore":"previews_hidden"}>- Remove language</div>
        </Fragment>
        )}
        <div onClick={handleAddLanguage} className="addMore">+ Add language</div>
        
        {/* countries*/}
        <select value={user && user.country} className="edu_form field_margin" onChange={e => setUser({ ...user, country: e.target.value })}>
        <option>Select a Country</option>
         {countryList.map((country)=>(<option value={country}>{country}</option>) )}
        </select>
        </div>

        <div className="edu_form field_margin">
        <input defaultValue={user && user.charge} onChange={e => setUser({ ...user, charge: e.target.value })} min='1' placeholder="Charge" type="number" />
        </div>
        <div className="edu_form field_margin">
        <input defaultValue={user && user.phoneNo} onChange={e => setUser({ ...user, phoneNo: e.target.value })} placeholder="Phone Number" type="text" />
        </div>

        {/*select subjects*/}
        {subject && subject.map((x,i)=>
        <Fragment key={i}>
        <div className="edu_form field_margin">
        <input value={x} onChange={handleChangeSubject(i)} placeholder={"Input subject  "+(i+1)}/>

        <div onClick={handleRemoveSubject(i)} className={subject.length>1?"removeMore":"previews_hidden"}>- Remove Subject</div>
        </div>
        </Fragment>
        )}
        <div onClick={handleAddSubject} className="addMore">+ Add a Subject</div>
        


        <div className="edu_review edu_form field_margin">
          <textarea defaultValue={user && user.about} className="reveiw_textarea" onChange={e => setUser({ ...user, about: e.target.value })} placeholder="About" type="text" />
          </div>

          <div >
                            <div className="side_side">
                            <div className="upload_container ">
                                <i class='bx bx-camera'></i> Upload picture
                            <input onChange={uploadProfilePicture} type="file" />
                            </div>
                            <i className={picture ? "check_position bx bxs-check-circle preview_active" : "preview_hidden"}></i>
                            </div>

                        </div>

                        <div >
                            <div className="side_side">
                            <div className="upload_container ">
                                <i class='bx bx-camera'></i> Upload identification
                            <input onChange={uploadIdCard} type="file" />
                            </div>
                            <i className={preview2 ? "check_position bx bxs-check-circle preview_active" : "preview_hidden"}></i>
                            </div>

                        </div>
        
        
        <button onClick={submitHandler} className="message_button change_color adjust_signin">Register</button>

        <div className="flex_or">
          <hr className="reduce_line"/>
          <div>OR</div> 
          <hr className="reduce_line"/>
        </div>

        <Link to="/signin"><div className="forgotten_password"> Sign In</div> </Link>

          </div>


      </div>
    </div>}
    </>
  )
}

export default RegisterScreen
