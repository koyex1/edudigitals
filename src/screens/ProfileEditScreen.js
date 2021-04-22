import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { tutorDetails } from '../actions/userActions';

function ProfileEditScreen() {

    const dispatch = useDispatch();
    const tutorResult = useSelector(state=>state.tutorResult)
    const {tutorInfo, error}= tutorResult;
    const userSignin = useSelector(state=>state.userSignin)
    const {userInfo} = userSignin
    console.log(userInfo._id)

    dispatch(tutorDetails(userInfo._id))


    return (
        <div className="surrounding_body">
            <div className="profile_container">
                <div className="image_rating_container">
                    <div className="image_container">
                    <img className="profile_dp" src=" ../images/dp.jpg" />
                    </div>
                   
                </div>
                <div className="about_container">
                <label>First Name</label>
                <input value={tutorInfo && tutorInfo.firstName}type="text" placeholder="Enter First Name"/>
                <label >Last Name</label>
                <input value={tutorInfo && tutorInfo.lastName} type="text" placeholder="Last Name"/>
                <label>Email</label>
                <input value={tutorInfo && tutorInfo.email} type="text" placeholder="Email"/>
                <label>Password</label>
                <input  type="password" placeholder="Password"/>
                <label>Language</label>
                <input value={tutorInfo && tutorInfo.language} type="text" placeholder="Language"/>
                <label>Phone Number</label>
                <input value={tutorInfo && tutorInfo.phoneNo} type="text" placeholder="phone Number"/>
                <label>Subjects</label>
                <input value={tutorInfo && tutorInfo.subjects} type="text" placeholder="Subjects"/>
                <label>charge</label>
                <input value={tutorInfo && tutorInfo.charge} type="number" placeholder="Charge"/>
                <label>About</label>
                <textarea value={tutorInfo && tutorInfo.about} className="title_2"></textarea>


                </div>
            </div>
            
        </div>
    )
}

export default ProfileEditScreen
