import { Table, Modal, Button, Tag, message, Space, Alert  } from 'antd'
import Column from 'antd/lib/table/Column'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ongoingTutors, updateComplete } from '../actions/transactionActions';
import { loginMessage } from '../actions/userActions';

function OngoingLessonScreen(props) {
    const [ongoing, setOngoing] = useState([])
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo, error} = userSignin;
    const [complete, setComplete] = useState(false);
    const [reason, setReason] = useState();
    const [tutor, setTutor] = useState();
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
      console.log(complete)
      console.log(ongoingId)
      updateComplete(ongoingId,{complete,reason, tutor})
      props.history.push(`/review/${tutor}`)
    };

    const handleSecondOk = () => {
      setSecondModal(false);
      console.log(reason)
      console.log(complete)
      console.log(ongoingId)
      updateComplete(ongoingId,{complete,reason, tutor})
      props.history.push(`/review/${tutor}`)
    };
  
    const handleCancel = () => {
      setFirstModal(false);
    };

    const handleSecondCancel = () => {
      setSecondModal(false);
    };


    useEffect(() => {
        ongoingTutors( userInfo && userInfo._id).then(data=>{
            setOngoing(data)
        })
    }, [])

    const showModal = (tutorId, id, condition) => (event)=> {
      setFirstModal(true);
      setOngoingId(id)
      setTutor(tutorId)
      setComplete(condition)
    };

    const showSecondModal = (tutorId, id, condition) => (event)=> {
      setSecondModal(true);
      setOngoingId(id)
      setTutor(tutorId)
      setReason(null)
      setComplete(condition)
    };

    return (
        <div>
            <div className="table_surrounding">
    <div class="container bold_font table_surrounding">

      <Table
        dataSource={ongoing && ongoing.tutors}
      >
        <div className="edu_verify_header">
          <Column title="Name" key="firstName" 
          render={(text, record) => (
              <div>{record.tutor && (record.tutor.firstName + ' ' + record.tutor.lastName)} </div>
          )}
          />
          

          <Column title="Subjects"  key="Subjects" 
          render={(text, record) => (
            <div>{record.tutor && record.tutor.subjects} </div>
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
                <button className="edu_verify_button website_color" onClick={showSecondModal(record.tutor._id, record._id, true)} ><i class=' bx bx-check'></i> Completed</button>
                <button className="edu_verify_button website_color" onClick={showModal(record.tutor._id, record._id, false)} ><i class='bx bx-x'></i>Not Completed</button>

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
                Reason for specifying session as incomplete?
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
                Are you sure the lesson was complete?
          </div>
        </Modal>
        </div>
    )
}

export default OngoingLessonScreen
