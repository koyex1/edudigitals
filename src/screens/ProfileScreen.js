import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { tutorDetails } from '../actions/userActions';

function ProfileScreen(props) {
    const dispatch = useDispatch();
    const id= props.match.params.id;
    
    const tutorResult = useSelector(state=>state.tutorResult)

    useEffect(() => {
        dispatch(tutorDetails(id))
    }, [])


    return (
        <div className="surrounding_body">
            <div className="profile_container">
                <div className="image_rating_container">
                    <div className="image_container">
                    <img className="profile_dp" src=" ../images/dp.jpg" />
                    </div>
                    <div className="rating_container">
                        <p className="title_2">Rating: {tutorResult && tutorResult.tutorInfo && tutorResult.tutorInfo.rating}</p>
                        <p className="title_2">Charge: ${tutorResult && tutorResult.tutorInfo &&  tutorResult.tutorInfo.charge}</p>
                        <p className="title_2">Subjects: { tutorResult && tutorResult.tutorInfo &&  tutorResult.tutorInfo.subjects}</p>
                        <button class="message_button change_color">Message</button>
                    </div>
                </div>
                <div className="about_container">
                <p className="title_1">{tutorResult && tutorResult.tutorInfo && tutorResult.tutorInfo.firstName} {tutorResult && tutorResult.tutorInfo &&  tutorResult.tutorInfo.lastName}</p>
                <p className="title_2 about_padding_top">About</p>
                <p>{tutorResult && tutorResult.tutorInfo && tutorResult.tutorInfo.about}</p>


                </div>
            </div>
            
        </div>
    )
}

export default ProfileScreen
