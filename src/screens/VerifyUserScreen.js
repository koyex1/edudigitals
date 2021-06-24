import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginMessage, pendingUsers, userVerify } from '../actions/userActions';
import { Table, Tag, Image, message, Modal, Space, Alert } from 'antd';
import { Button, Link } from '@material-ui/core';

const { Column, ColumnGroup } = Table;




function VerifyUserScreen(props) {

  const dispatch = useDispatch();
  const verifyInfo = useSelector(state => state.verifyInfo)
  const { verifyMessage } = verifyInfo
  const pendingResult = useSelector(state => state.pendingResult);
  const { pendingInfo } = pendingResult;


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageSource, setImageSource] = useState();

  var userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin;


  if(!userInfo){
   dispatch(loginMessage('You must be logged in first to access this page'))
    console.log(props.history.push('/signin'))
  }

  const showModal = (event) => (record) => {
    setIsModalVisible(true);
    setImageSource( `data:${record.profilePicture && record.profilePicture.contentType};base64,${Buffer.from(record.profilePicture && record.profilePicture.data.data).toString('base64')}`)

  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //-------CLICKS
  const handleVerification = (userId) => (event) => {

    dispatch(userVerify('true', userId));
  }
  const handleUnverification = (userId) => (event) => {

    dispatch(userVerify('false', userId));
  }

  useEffect(() => {
    console.log('inside verify')
   if(verifyMessage && verifyMessage.message){
     message.info(verifyMessage.message)
   }

  }, [verifyMessage])

  //--------USEEFFECTS
  useEffect(() => {
    dispatch(pendingUsers());

  }, [dispatch, verifyInfo])



  return (
    <>
<div className="table_surrounding">
    <div class="container bold_font table_surrounding">
        <Table
        dataSource={pendingInfo && pendingInfo.user}
      >
        <div className="edu_verify_header">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
          <Column
          title="Picture"
          key="action"
          render={(text, record) => (
            <div style={{position: 'relative'}} >View<Image style={{opacity: '0.1', width: '2px', position:'absolute'}} src ={`data:${record.profilePicture && record.profilePicture.contentType};base64,${Buffer.from(record.profilePicture && record.profilePicture.data.data).toString('base64')}`}/></div>
          )}
        /> 
        <Column
          title="Identification"
          key="action"
          render={(text, record) => (
            <div style={{position: 'relative'}} >View<Image style={{opacity: '0.1', width: '2px', position:'absolute'}} src ={`data:${record.idCard && record.idCard.contentType};base64,${Buffer.from(record.idCard && record.idCard.data.data).toString('base64')}`}/></div>
          )}
        /> 
        </div>
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <div>
              <Space size="middle">
                <button className="edu_verify_button website_color" onClick={handleVerification(record._id)} value={record._id}><i class=' bx bx-check' ></i></button>
                <button className="edu_verify_button website_color" onClick={handleUnverification(record._id)} value={record._id}><i class=' bx bx-x'></i></button>
              </Space>
            </div>
          )}
        />
      </Table>



    </div>

    </div>
    <Modal title="Image" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       <Image style={{height: '200px', width: '100px'}} src={imageSource}/>
      </Modal>
    </>
  )
}

export default VerifyUserScreen
