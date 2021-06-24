import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getNotification } from '../actions/transactionActions';
import { loginMessage } from '../actions/userActions';


function NotificationScreen(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const [notification, setNotification] = useState();
    const dispatch = useDispatch()

  
  
    if(!userInfo){
     dispatch(loginMessage('You must be logged in first to access this page'))
      console.log(props.history.push('/signin'))
    }
    useEffect(() => {
        getNotification(userInfo && userInfo._id).then(data=>{
        setNotification(data)
        console.log(data)
        })
    }, [])


    return (
        <div>
            {
            notification && notification
            .map(x => 
            (   <div>

                <div className="tutor_notification">
                <div >{x.tutor._id==userInfo._id && x.student.firstName + ' ' + x.student.lastName} 
                {x.tutor._id==userInfo._id && x.orderId && " has payed to escrow account"}
                </div>
                <div >{x.tutor._id==userInfo._id && x.student.firstName + ' ' + x.student.lastName} 
                {x.tutor._id==userInfo._id && x.complete?" closed lesson as complete": " hasnt closed lesson as incomplete"}
                </div>
                </div>


                <div className="student_notification">
                 <div >{x.student._id==userInfo._id && x.tutor.firstName + ' ' + x.tutor.lastName} 
                {x.student._id==userInfo._id && x.orderId && " you have started session"}
                </div>
                <div >{x.student._id==userInfo._id && x.tutor.firstName + ' ' + x.tutor.lastName} 
                {x.student._id==userInfo._id && x.appeal? " appealed": " has not appealed"}
                </div>
                </div>


                </div>
            )
                )
            }
            
            
        </div>
    )
}

export default NotificationScreen
