import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { tutorDetails } from '../actions/userActions';
import { firstToUpper } from '../data/data';



function ProfileScreen(props) {
    const dispatch = useDispatch();
 
    const parameters=props.location.search.split('&');
    
    const id= parameters[0].substring(1)
    const firstName =parameters[1]
    const lastName = parameters[2]
    const tutorResult = useSelector(state=>state.tutorResult)
    const {tutorInfo} = tutorResult;

    useEffect(() => {
        dispatch(tutorDetails(id))
    }, [])

    const openMessage= ()=>{
        props.history.push(`/chats?${id}&${firstName}&${lastName}`);
    }


    return (
        <div className="surrounding_body">
            <div className="profile_container">
                <div className="image_rating_container">
                    <div className="image_container">
                    <img className="profile_dp" src=" ../images/dp.jpg" />
                    </div>
                    <div className="rating_container">
                        <p className="title_2">Rating: {tutorInfo && tutorInfo.rating}</p>
                        <p className="title_2">Charge: ${tutorInfo && tutorInfo.charge}</p>
                        <p className="title_2">Subjects: {tutorInfo && tutorInfo.subjects}</p>
                        <button onClick={openMessage} class="message_button change_color">Message</button>
                    </div>
                </div>
                <div className="about_container">
                <p className="title_1">{tutorInfo && firstToUpper(tutorInfo.firstName)} {tutorInfo && firstToUpper(tutorInfo.lastName)}</p>
                <p className="title_2 about_padding_top">About</p>
                <p>{tutorInfo && tutorInfo.about}</p>


                </div>
            </div>
            
        </div>
    )
}

export default ProfileScreen
