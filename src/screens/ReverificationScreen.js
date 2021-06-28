import React, { Fragment, useEffect, useState } from 'react'
import { Form, Input, message, Button, Select, InputNumber, Switch,Radio,
    Slider, Upload, Rate, Checkbox, Row, Col, Alert, } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { hideNavBar, ImageCrop, reverify, rememberInfo, loginMessage } from '../actions/userActions';
import {emptyValidator, imageValidator} from '../validator/validator';
import axios from 'axios';
import CropImage from '../components/cropImage/CropImage';
import { useRef } from 'react';
import { resizeFile } from '../Config/resizeFile';


function ReverificationScreen(props) {
  const userSignin = useSelector(state => state.userSignin);
  const picture = useSelector(state => state.picture);
  const {userInfo, error} = userSignin;
  const [info, setInfo] = useState({firstName:'', lastName: ''})
  const reverifyInfo = useSelector(state => state.reverifyInfo)
  const {verifyMessage} = reverifyInfo
  const [errorMessage, setErrorMessage] = useState();
  const [identification , setIdentification] = useState()
  const [preview1, setPreview1] = useState(false)
  const [preview2, setPreview2] = useState(false)
  const recallInfo = useSelector(state => state.recallInfo);

  const dispatch = useDispatch()
 


  if(!userInfo){
   dispatch(loginMessage('You must be logged in first to access this page'))
    console.log(props.history.push('/signin'))
  }

  //--------ONCLICK FUNCTIONS
  console.log(verifyMessage)

  const onFinish = () => {
    if(emptyValidator(info.firstName)){
      message.info('Input FirstName')
      return;
    }
    if(emptyValidator(info.lastName)){
      message.info('Input LastName')
      return;
    }
    if(imageValidator(picture)){
      message.info('Upload a Profille Picture')
      return;
    } 
    if(imageValidator(preview2)){
      message.info('Upload an Identification Card')
      return;
    }     

      let myData = new FormData()
      myData.append('file', identification)
      myData.append('file2', picture)
      myData.append('user', JSON.stringify(info))
      dispatch(reverify( userInfo._id, myData))
         

    }

    useEffect(() => {
     
      if(verifyMessage && verifyMessage.message){
        message.info(verifyMessage.message)
      }

    }, [verifyMessage])


    const uploadProfilePicture = async(e) => {
      if (e.target.files && e.target.files.length > 0) {
        
        const view = await resizeFile(e.target.files[0])
        dispatch(ImageCrop(view))

        // const reader = new FileReader();
        // reader.readAsDataURL(e.target.files[0]);
        // reader.addEventListener("load", () => {
        //   dispatch(ImageCrop(reader.result))
        // });
      }

      dispatch(hideNavBar(true))

    
      //  setUser({...user, profilePicture: data})
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


     const inputRef = useRef();


     const triggerFileSelectPopup = () => inputRef.current.click();

     useEffect(() => {
      if(recallInfo){
      setInfo(recallInfo.info)
      setIdentification(recallInfo.identification)}
      return () => {
        dispatch(hideNavBar(false))
        dispatch(ImageCrop(null))
        dispatch(rememberInfo(null))
  
  
      }
    }, [])

    useEffect(() => {
      dispatch(rememberInfo({info, identification}))
      
    }, [ dispatch, identification, info])

    return (
      <>
 
       
       {  picture && !picture.name?
   <CropImage triggerFileSelectPopup={triggerFileSelectPopup} />
   :

        <div className="sign_form">
        <div className="edu_form_header"><Alert
        message="Submit Details for Verification"
        type="warning"
         /></div>
        
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      
      <div >
            <div className="edu_form field_margin">
        <input  defaultValue={info && info.firstName}   onChange={e=> setInfo({ ...info, firstName: e.target.value})} placeholder="FirstName" type="text" />
        </div>
        <div className="edu_form">
        <input  defaultValue={info && info.lastName}  onChange={e=> setInfo({ ...info, lastName: e.target.value})} placeholder="LastName" type="text" />
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
        <button onClick={onFinish} className="message_button change_color adjust_signin">Submit Details</button>


          </div>


            

      
      </Form>
        </div>}
        </>
       
    )
}

export default ReverificationScreen
