import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToBookmark, loginMessage, tutorDetails } from '../actions/userActions';
import {
    Form, Input, message, Button, Select, InputNumber, Switch, Radio,
    Slider, Upload, Rate, Checkbox, Row, Col, Alert, Pagination,
} from 'antd';
import { firstToUpper } from '../data/data';
import img from '../images/none.png'
import { getReviews } from '../actions/reviewActions';
import { cartList } from '../actions/cartActions';




function ProfileScreen(props) {
    const dispatch = useDispatch();

    const parameters = props.location.search.split('&');

    const id = parameters[0].substring(1)
    const firstName = parameters[1]
    const lastName = parameters[2]
    const tutorResult = useSelector(state => state.tutorResult)
    const { tutorInfo } = tutorResult;
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    const [qty, setQty] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [bookmarkedInfo, setBookmarkedInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;

    const cartContext = React.createContext()


    useEffect(() => {
        dispatch(tutorDetails(id))
    }, [])

    useEffect(() => {
        getReviews(id, { limit, currentPage }).then(data => {
            setReviews(data)
        })
    }, [currentPage])


    const handleBookmark = () => {
        
  
    if(!userInfo){
     dispatch(loginMessage('You must be logged in first to bookmark a tutor for later'))
      props.history.push('/signin')
    }else{
        addToBookmark(id, userInfo._id).then(data => {
          
            message.success( data.message)
        })
         }
    }

    const openMessage = () => {
        props.history.push(`/chat?${id}&${firstName}&${lastName}`);
    }

    const handlePagination = (page, pageSize) => {
        setCurrentPage(page)
    }

    let cart = []
    const addToCart = () => {
        cart = localStorage.getItem('edudigital_cart') ? JSON.parse(localStorage.getItem('edudigital_cart')) : []
        cart = cart.filter(x => x._id != tutorInfo._id)
        cart.push({ ...tutorInfo, qty: qty })
        const data = localStorage.setItem('edudigital_cart', JSON.stringify(cart))
        dispatch(cartList());
        message.success('successfully added to cart')
    }


    return (
        <>

            <div className="surrounding_body">
                <div className="edu_shadow entire_container">
                <div className="profile_container ">
                    <div className="image_rating_container">
                        <div className="image_container">
                            <img className="profile_dp" src={!tutorInfo? img:`data:${tutorInfo && tutorInfo.profilePicture.contentType};base64,${tutorInfo && Buffer.from(tutorInfo.profilePicture.data.data).toString('base64')}`} />
                        </div>
                        <div className="rating_container">
                            <p className="title_1 profile_name_space">{tutorInfo && firstToUpper(tutorInfo.firstName)} {tutorInfo && firstToUpper(tutorInfo.lastName)}</p>
                            <div className="title_2 edu_flex"><p>Charge: {tutorInfo && tutorInfo.charge} $/hr <i class='bx bxs-dollar-circle'></i> </p> <p className="title_2 " style={{marginLeft: '20px'}}>Country: {tutorInfo && tutorInfo.country}  <i class='bx bxs-flag-alt'></i></p> </div>
                            <p className="title_2">Rating: {tutorInfo && tutorInfo.rating} <i className='bx bxs-star' ></i></p>
                            <p className="title_2">Completed Lessons: {tutorInfo && tutorInfo.tutorials}  <i class='bx bxs-book-open'> </i>  </p>
                            <div className="edu_flex"><p>Languages:</p><div  className="language">{tutorInfo && tutorInfo.language.split(',').map(
                                x => (
                                    <div className="span_block">{x}</div>
                                )
                            )

                            }</div></div>
                            <div className="edu_flex"><p >Subjects: </p><div className="subjects">{tutorInfo && tutorInfo.subjects.split(',').map(
                                x => (
                                    <div className="span_block">{x}</div>
                                )
                            )

                            }</div></div>
                            <button onClick={openMessage} class="message_button change_color"><i class='bx bx-message-detail'></i> Message</button>
                            <button onClick={handleBookmark} class="message_button change_color" ><i class='bx bx-bookmark-plus'></i> Bookmark</button>
                            <div class="profile_cart_container"><button style={{ fontSize: '13px' }} onClick={addToCart} class=" change_color profile_cart_button" ><i style={{ fontSize: '18px' }} class=' bx bx-cart-alt'></i> Add to cart</button><input onChange={e => setQty(e.target.value)} min={1} defaultValue={1} type="number" /> <div className="nawa"> {qty<2?<p className="hours_position"> HR</p>:<p className="hours_position"> HRS</p>}</div></div>
                        </div>
                    </div>
                    <div className="about_container">
                        <p className="title_1">About</p>
                        <p>{tutorInfo && tutorInfo.about}</p>


                    </div>
                </div>
                <div className="review_container">
                    <div className="title_1 edu_profile_review">Reviews</div>

                    {reviews && reviews.review && reviews.review.length == 0 ?
                        <div className="no_reviews">No reviews</div>
                        :
                        <div>
                            {reviews && reviews.review && reviews.review.map(x => (
                                <div className="reviewContainer">

                                    <div style={{ fontSize: "25px", }}><Rate disabled defaultValue={x.rating} />{x.rating}<span style={{ fontSize: "15px" }} >/ 5</span></div>
                                    <div className="reviewer">
                                        <div className="text">{x.student.firstName + ' ' + x.student.lastName}</div>
                                        <div>{x.createdAt}</div>
                                    </div>
                                    <div className="edu_review_content">
                                        {x.review}
                                    </div>

                                </div>
                            ))}
                            <div className="edu_pagination" >
                                <Pagination
                                    current={currentPage}
                                    total={reviews ? reviews.total : 0}
                                    pageSize={5}
                                    onChange={handlePagination} />
                            </div>
                        </div>

                    }


                </div>
                </div>

            </div>
        </>
    )
}

export default ProfileScreen
