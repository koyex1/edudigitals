import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pendingUsers, userVerify } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import { Table, Tag, Space, Button } from 'antd';
import { Link } from '@material-ui/core';

const { Column, ColumnGroup } = Table;




function VerifyUserScreen() {

  const dispatch = useDispatch();
  const verifyInfo = useSelector(state=>state.verifyInfo)
  const pendingResult = useSelector(state=>state.pendingResult);
  const {pendingInfo} = pendingResult;
  
  

  const handleVerification = (e)=>{
    const id = e.target.value
     dispatch(userVerify('true', id));
  }
  const handleUnverification = (e)=>{
 const id = e.target.value
   dispatch(userVerify('false', id));
  }

  
  useEffect(() => {
    dispatch(pendingUsers());
    console.log(pendingResult.pendingInfo);
  }, [dispatch, verifyInfo])
  


    return (
      
        <div class="container bold_font">
 <Table  
 dataSource={pendingInfo && pendingInfo.user}
 >
    <ColumnGroup title="Name">
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
    </ColumnGroup>
    <Column title="Picture" dataIndex="age" key="age"/>
    <Column title="ID" dataIndex="address" key="address" />
    <Column 
      title="Action"
      key="action"
      render={(text, record) => (
        <Space size="middle">
          <button onClick={handleVerification} value={record._id}>Verify</button>
          <button onClick={handleUnverification} value={record._id}>Unverify</button>
        </Space>
      )}
    />
  </Table>

          
          {/* <MessageBox>{verifyInfo && verifyInfo.verifyMessage && verifyInfo.verifyMessage.message}</MessageBox>
          {console.log("render")}
  <h2>Verify Users<small>support role</small></h2>
  <ul class="responsive-table">
    <li class="table-header">
      <div class="col col-3">User Name</div>
      <div class="col col-1">profile picture</div>
      <div class="col col-1">Identification Card</div>
      <div class="col col-1">Verify/Unverify</div>

    </li>
      {console.log(pendingResult)}
    
    {
     pendingResult && pendingResult.pendingInfo &&  pendingResult.pendingInfo.user.map(
        (pending) => (
          <li key={pending._id} class="table-row">
      <div class="col col-3" data-label="Job Id">{pending.firstName} {pending.lastName}</div>
      <div class="col col-1" data-label="Customer Name"><img className="search_display_pic" src=" ../images/dp.jpg" /></div>
      <div class="col col-1" data-label="Amount"><img className="search_display_pic" src=" ../images/idcard.jpg" /></div>
      <div class="col col-1" data-label="Payment Status"><button onClick={handleVerification} value={pending._id}>verify</button><button value={pending._id} onClick={handleUnverification}>unverify</button></div>
    </li>
        )
      )
    }
    
    
  </ul> */}
</div>
    )
}

export default VerifyUserScreen
