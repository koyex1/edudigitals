import React, { useState } from 'react'
import { Rate, message } from 'antd';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { reviewPost } from '../actions/reviewActions';
import { useSelector } from 'react-redux';


const useStyles = makeStyles({
  root: {
    
  },
 
});


function ReviewScreen(props) {
  const tutorId=props.match.params.id
    const [review, setReview] = useState();
    const [rating, setRating] = useState(1);
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;


    const desc = ['1', '2', '3', '4', '5'];
    const onFinish = () =>{
      console.log(tutorId)
      const info = {review, rating, tutorId}
      console.log(userInfo._id)
      console.log(info)
      reviewPost(userInfo._id, info )
      message.success('review submitted')
    }

    const handleRating=(value)=>{
      setRating(value)
    }
    const classes = useStyles();

    return (
        <div className="sign_container">

        <div className="sign_form">
        <div className="edu_form_header">Review</div>
  
          
           <div>
           {rating ? <span className="ratingSize">{rating}</span> : ''}
            <Rating
            className={classes.root}
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          defaultValue={2} 
          size="large"
        />
           </div>
           
            <div >
              <div className="edu_review edu_form field_margin">
          <textarea className="reveiw_textarea" onChange={e=>{setReview(e.target.value)}} placeholder="Reveiw" type="text" />
          </div>
         
          
          
          <button onClick={onFinish} className="message_button change_color adjust_signin">Submit Review
          </button>
  
          
            </div>
  
  
        </div>
      </div>
    )
}

export default ReviewScreen
