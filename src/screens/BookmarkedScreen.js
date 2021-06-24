import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookmarked, loginMessage, pendingUsers, removeUser, userVerify } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import { Table, Tag,message, Space, Alert } from 'antd';
import { Button, Link } from '@material-ui/core';

const { Column, ColumnGroup } = Table;

function BookmarkedScreen(props) {
    const dispatch = useDispatch();
  const verifyInfo = useSelector(state => state.verifyInfo)
  const { verifyMessage } = verifyInfo
  const pendingResult = useSelector(state => state.pendingResult);
  const { pendingInfo } = pendingResult;
  const userSignin = useSelector(state=>state.userSignin)
    const {userInfo} = userSignin
    const [bookmark, setBookmark] = useState([]);
    const [removedMessage, setRemovedMessage] = useState();

  
  
    if(!userInfo){
     dispatch(loginMessage('You must be logged in first to access this page'))
      console.log(props.history.push('/signin'))
    }



  //-------CLICKS
  const handleRemove = (id, userId) => (event) => {
    console.log(id + ' ' + userId)

    removeUser(id, userId).then(data=>{
      message.error(data.message)
    })

  }


  const handleMessage = (tutor) => (event) => {

    props.history.push(`/chat?${tutor._id}&${tutor.firstName}&${tutor.lastName}`)

  }
  const handlePayment = (userId) => (event) => {

    dispatch(userVerify('false', userId));
  }

  console.log(bookmark)

  //--------USEEFFECTS
  useEffect(() => {
    getBookmarked(userInfo && userInfo._id).then(data=>{
        setBookmark(data)
    });

  }, [bookmark, userInfo])



  return (
<div className="table_surrounding">
    <div class="container bold_font table_surrounding">

      <Table
        dataSource={bookmark && bookmark.tutors}
      >
        <div className="edu_verify_header">
          <Column title="Name" key="firstName" 
          render={(text, record) => (
              <div>{record.tutor && (record.tutor.firstName + ' ' + record.tutor.lastName)} </div>
          )}
          />
          

          <Column title="subjects"  key="subjects" 
          render={(text, record) => (
            <div>{record.tutor && record.tutor.subjects} </div>
        )}
          />
         <Column title="language"  key="language" 
          render={(text, record) => (
            <div>{record.tutor && record.tutor.language} </div>
        )}
          />

        <Column title="Country"  key="country" 
          render={(text, record) => (
            <div>{record.tutor && record.tutor.country} </div>
        )}
          />

    <Column title="charge"  key="charge" 
          render={(text, record) => (
            <div>$ {record.tutor && record.tutor.charge} </div>
        )}
          />

        </div>
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <div>
              <Space size="middle">
                <button className="edu_verify_button website_color" onClick={handleRemove(record._id, userInfo._id)} ><i class='bx bx-trash'></i></button>
                <button className="edu_verify_button website_color" onClick={handleMessage(record.tutor)} ><i class='bx bx-message-detail' ></i></button>

              </Space>
            </div>
          )}
        />
      </Table>



    </div>
    </div>
    )
}

export default BookmarkedScreen
