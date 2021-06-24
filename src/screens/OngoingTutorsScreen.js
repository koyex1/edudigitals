import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Modal, Button, Tag, message, Space, Alert } from 'antd';
import { ongoingStudents, updateAppeal } from '../actions/transactionActions';
import Column from 'antd/lib/table/Column';
import { loginMessage } from '../actions/userActions';

function OngoingTutorsScreen(props) {
    const [ongoing, setOngoing] = useState([])
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo, error} = userSignin;
    const [appeal, setAppeal] = useState(false);
    const [reason, setReason] = useState();
    const [ongoingId, setOngoingId] = useState();
    const dispatch = useDispatch()

    
    const [firstModal, setFirstModal] = useState(false);
    const [secondModal, setSecondModal] = useState(false);
  
  
    if(!userInfo){
     dispatch(loginMessage('You must be logged in first to access this page'))
      console.log(props.history.push('/signin'))
    }

    const handleOk = () => {
        setFirstModal(false);
        console.log(reason)
        console.log(appeal)
        console.log(ongoingId)
        updateAppeal(ongoingId,{appeal,reason})
      };

      const handleSecondOk = () => {
        setSecondModal(false);
        console.log(reason)
        console.log(appeal)
        console.log(ongoingId)
        updateAppeal(ongoingId,{appeal,reason})
      };
    
      const handleCancel = () => {
        setFirstModal(false);
      };

      const handleSecondCancel = () => {
        setSecondModal(false);
      };

    useEffect(() => {
       
        ongoingStudents(userInfo && userInfo._id).then(data=>{
            setOngoing(data)
        })
    }, [])



    const showModal = (id, condition) => (event)=> {
        setFirstModal(true);
        setOngoingId(id)
        setAppeal(condition)
      };

      const showSecondModal = (id, condition) => (event)=> {
        setSecondModal(true);
        setOngoingId(id)
        setReason(null)
        setAppeal(condition)
      };
      
    return (
        <div>
            <div className="table_surrounding">
    <div class="container bold_font table_surrounding">

      <Table
        dataSource={ongoing && ongoing.students}
      >
        <div className="edu_verify_header">
          <Column title="Name" key="firstName" 
          render={(text, record) => (
              <div>{record.student && (record.student.firstName + ' ' + record.student.lastName)} </div>
          )}
          />
          

          <Column title="Subjects"  key="Subjects" 
          render={(text, record) => (
            <div>{record.student && record.student.subjects} </div>
        )}
          />

        <Column title="amount"  key="amount" 
          render={(text, record) => (
            <div>$ { record.amount} </div>
        )}
          />
          

    

        </div>
        <Column
          title="Lesson Progress"
          key="action"
          render={(text, record) => (
            <div>
              <Space size="middle">
                <button className="edu_verify_button website_color" onClick={showModal(record._id, true)} ><i class=' bx bx-check'></i> Appeal</button>
                <button className="edu_verify_button website_color" onClick={showSecondModal(record._id, false)} ><i class='bx bx-x'></i>Not Appeal</button>

              </Space>
            </div>
          )}
        />
      </Table>



    </div>
    </div>
    <Modal
          visible={firstModal}
          title="Reason"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Submit
            </Button>,
          ]}
        >
            <div className="edu_review">
                What is your reason for appealing?
          <textarea onChange={e=>setReason(e.target.value)} type="text"/>
          </div>
        </Modal>

        <Modal
          visible={secondModal}
          title="Confirm"
          onOk={handleSecondOk}
          onCancel={handleSecondCancel}
        >
            <div className="edu_review">
                Are you sure you do not want to appeal?
          </div>
        </Modal>
        </div>
    )

}

export default OngoingTutorsScreen
