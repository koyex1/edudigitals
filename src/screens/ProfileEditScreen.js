import { Alert, Button, message, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideNavBar, ImageCrop, tutorDetails, updateImage, updateInfo, updatePassword } from '../actions/userActions';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import img from '../images/none.png'
import { alphabetValidator, emptyValidator, imageValidator, passwordConfirmValidator } from '../validator/validator';
import { countryList, languages, roles } from '../data/data';
import axios from 'axios';
import { Fragment } from 'react';
import CropImage from '../components/cropImage/CropImage';


function ProfileEditScreen() {

    const dispatch = useDispatch();
    const tutorResult = useSelector(state => state.tutorResult)
    const { tutorInfo, error } = tutorResult;
    const userSignin = useSelector(state => state.userSignin)
    const picture = useSelector(state => state.picture);
    const { userInfo } = userSignin
    const [user, setUser] = useState({});
    const [editMessage, setEditMessage] = useState()
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [preview1, setPreview1] = useState()
    const [refresh, setRefresh] = useState(false)
    const [language, setLanguage] = useState([])
    const [subject, setSubject] = useState([])
    const [lag, setLag] = useState();
    const inputRef = useRef();


    //submit updateInformation
    const updateInformation = () => {
        if (emptyValidator(user.phoneNo)) {
            message.info('Enter Phone Number')
            return;
        }
        for(let x in language){
            let languageNo = parseInt(x)+1;

            if(emptyValidator(language[x])){
                message.info('Enter Languge ' + languageNo)
                return;
            }
            if(alphabetValidator(language[x])){
                message.info('Language ' + languageNo + ' should contain only alphabets')
                return
              }
        }

        if (emptyValidator(user.country)) {
            message.info('Enter your country')
            return;
        }


        for(let x in subject){
            let subjectNo = parseInt(x)+1;

            if(emptyValidator(subject[x])){
                message.info('Enter Subject ' + subjectNo)
                return;
            }
            if(alphabetValidator(subject[x])){
                message.info('subject ' + subjectNo + ' should contain only alphabets')
                return
              }
        }

        if (emptyValidator(user.about)) {
            message.info('Enter something about you')
            return;
        }

        let success
        updateInfo(userInfo._id, user).then(data => {
            success = data.message;
            success && message.info('Information updated')
        }
        )
    }



    //submit password change
    const handlePassword = () => {
        if (emptyValidator(oldPassword)) {
            message.info('input your old Password')
            return;
        }
        if (emptyValidator(newPassword)) {
            message.info('input a new Password')
            return;
        }
        if (emptyValidator(confirmPassword)) {
            message.info('Confirm Password')
            return;
        }
        if (passwordConfirmValidator(newPassword, confirmPassword)) {
            message.info('Passwords do not match');
            return;
        }
        let success;
        updatePassword(userInfo._id, { oldPassword, newPassword }).then(
            data => {
                console.log(data)
                success = data.message
                success && message.info('Password successfully changed')
                !success && message.info('Old password does not match')
            }
        )

    }
    //submit image

    const submitHandler = () => {
        if (imageValidator(picture)) {
            message.info('you did not upload any image')
            return;
        }
        let myData = new FormData()
        myData.append('file', picture)
        axios.post('https://httpbin.org/anything', myData).then(res => console.log(res));
        updateImage(userInfo._id, myData);
        setRefresh(true)
        message.info('image updated')
        window.location.reload();
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

    ///Refresh UseEffect
    useEffect(() => {
        setRefresh(false)
        dispatch(tutorDetails(userInfo._id))
        dispatch(ImageCrop(null))
    }, [refresh, dispatch, userInfo])

    useEffect(() => {
        if (editMessage) {
            message.info(editMessage)
        }
    }, [editMessage])



    useEffect(() => {
        if (tutorInfo) {
            setUser({
                phoneNo: tutorInfo.phoneNo,
                country: tutorInfo.country,
                charge: tutorInfo.charge,
                about: tutorInfo.about
            })
            setLanguage(tutorInfo  && tutorInfo.language.split(','))
            setSubject(tutorInfo &&  tutorInfo.subjects.split(','))
        }
    }, [tutorInfo])

    useEffect(() => {
        return () => {
          dispatch(hideNavBar(false))
          dispatch(ImageCrop(null))
    
    
        }
      }, [])

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

    useEffect(() => {
        setUser({...user, subjects: subject, language: language})
 
    }, [subject,language])

    const triggerFileSelectPopup = () => inputRef.current.click();


    return (
        <>{
            picture && !picture.name?
            <CropImage triggerFileSelectPopup={triggerFileSelectPopup} />
            :
            <div className="surrounding_body">
                <div className="edu_shadow entire_container">

            <div className="profile_container">

                <div className="image_rating_container edit_image_container">
                    <div className="title_1">Edit Information</div>
                    <div className="image_container edit_image_container">
                        <img className="profile_dp edit_dp_bottom" src={tutorInfo ? `data:${tutorInfo && tutorInfo.profilePicture.contentType};base64,${tutorInfo && Buffer.from(tutorInfo.profilePicture.data.data).toString('base64')}` : img} />
                        <div >
                            <div className="side_side">
                            <div className="upload_container upload_change_width">
                                <i class='bx bx-camera'></i> Upload picture
                            <input onChange={uploadProfilePicture} type="file" />
                            </div>
                            <i className={picture ? "check_position bx bxs-check-circle preview_active" : "preview_hidden"}></i>
                            </div>
                            <button onClick={submitHandler} className="message_button change_color">Save Picture</button>

                        </div>
                    </div>
                    <div >Completed Lessons: <p className="title_1">{tutorInfo && tutorInfo.tutorials} </p></div>
                    <div >Ratings: <p className="title_1">{tutorInfo && tutorInfo.rating} / 5 </p></div>


                </div>


                <div className="about_container flex_edit_profile">
                    <div className="title_1 edu_underline">Personal Information</div>
                    <label>First Name</label>
                    <input className="cant_change" value={tutorInfo && tutorInfo.firstName} type="text" placeholder="Enter First Name" />
                    <label >Last Name</label>
                    <input className="cant_change" value={tutorInfo && tutorInfo.lastName} type="text" placeholder="Last Name" />
                    <label>Email</label>
                    <input className="cant_change" value={tutorInfo && tutorInfo.email} type="text" placeholder="Email" />
                    <label></label>


                    <div className="title_1 edu_underline header_top"> Other Information</div>

                    <label>Phone Number</label>
                    <input defaultValue={tutorInfo && tutorInfo.phoneNo} onChange={(e) => setUser({ ...user, phoneNo: e.target.value })}
                        type="text" placeholder="phone Number" />

                    {/*languages*/}
                    <label>Languages</label>
                    {language && language.map((x, i) =>
                        <Fragment key={i}>
                            <select value={x} className="edu_form " onChange={handleChangeLanguage(i)}>
                                <option value=''>Select a Language {i + 1}</option>
                                {languages.map((language) => (<option value={language}>{language}</option>))}
                            </select>
                            <div onClick={handleRemoveLanguage(i)} className={language.length > 1 ? "removeMore" : "previews_hidden"}>- Remove language</div>
                        </Fragment>
                    )}
                    <div onClick={handleAddLanguage} className="addMore">+ Add language</div>


                    <label>Country</label>
                    <select value={user.country ? user.country : (tutorInfo && tutorInfo.country)} className="edu_form field_margin" onChange={e => setUser({ ...user, country: e.target.value })}>
                        {countryList.map((country) => (<option value={country}>{country}</option>))}
                    </select>



                    {/*subjects */}
                    <label>Subjects</label>
                    {subject && subject.map((x, i) =>
                        <Fragment key={i}>
                            <input value={x} onChange={handleChangeSubject(i)}
                        type="text" placeholder={"Input subject  "+(i+1) }/>
                            <div onClick={handleRemoveSubject(i)} className={subject.length > 1 ? "removeMore" : "previews_hidden"}>- Remove Subject</div>
                        </Fragment>
                    )}
                    <div onClick={handleAddSubject} className="addMore">+ Add Subject</div>


                    <label>charge</label>
                    <input defaultValue={tutorInfo && tutorInfo.charge} min='1' onChange={(e) => setUser({ ...user, charge: e.target.value })} type="number" placeholder="Charge" />
                    <label>About</label>
                    <textarea defaultValue={tutorInfo && tutorInfo.about} onChange={(e) => setUser({ ...user, about: e.target.value })} className="title_2"></textarea>
                    <button onClick={updateInformation} className="message_button change_color">Update Other Information</button>


                    <div className="title_1 edu_underline header_top"> Change Password</div>

                    <label>Old Password</label>
                    <input onChange={e => { setOldPassword(e.target.value) }} type="password" placeholder="Password" />
                    <label>New Password</label>
                    <input onChange={e => { setNewPassword(e.target.value) }} type="password" placeholder="Password" />
                    <label>Confirm Password</label>
                    <input onChange={e => { setConfirmPassword(e.target.value) }} type="password" placeholder="Password" />
                    <button onClick={handlePassword} className="message_button change_color">Update Password</button>






                </div>
            </div>
            </div>

        </div>
         }
    </>
    )
}

export default ProfileEditScreen
