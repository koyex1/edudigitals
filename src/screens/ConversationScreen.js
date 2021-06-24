import React, { useEffect, useState } from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
import { SendButton } from '@chatscope/chat-ui-kit-react/dist/cjs/Buttons/SendButton';
import { AttachmentButton } from '@chatscope/chat-ui-kit-react/dist/cjs/Buttons/AttachmentButton';
import InputToolbox from '@chatscope/chat-ui-kit-react/dist/cjs/InputToolbox';
import Avatar from '@chatscope/chat-ui-kit-react/dist/cjs/Avatar';
import MessageSeparator from '@chatscope/chat-ui-kit-react/dist/cjs/MessageSeparator';
import ConversationHeader from '@chatscope/chat-ui-kit-react/dist/cjs/ConversationHeader';
import { InfoButton } from '@chatscope/chat-ui-kit-react/dist/cjs/Buttons/InfoButton';
import TypingIndicator from '@chatscope/chat-ui-kit-react/dist/cjs/TypingIndicator';
import img from '../images/none.png'
import Conversation from '@chatscope/chat-ui-kit-react/dist/cjs/Conversation';
import ConversationList from '@chatscope/chat-ui-kit-react/dist/cjs/ConversationList';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import Status from '@chatscope/chat-ui-kit-react/dist/cjs/Status';
import { Badge } from 'antd';
import socket from '../Config/socketConfig'
import { contactList } from '../actions/chatActions';
import { loginMessage } from '../actions/userActions';



function ChatScreen(props) {

  //-------------contact list
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const senderId = userInfo && userInfo._id;
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch()

  const handlePush = (contact) => (event) => {



    props.history.push(`/chat?${contact._id}&${contact.firstName}&${contact.lastName}`)
    console.log(contact._id.toString())


  }


  if(!userInfo){
   dispatch(loginMessage('You must be logged in first to access this page'))
    console.log(props.history.push('/signin'))
  }
  //-------chat content
  const parameters = props.location.search.split('&');
  const recipientId = parameters[0].substring(1)
  const [onlineStatus, setOnlineStatus] = useState([]);


  socket.emit('onlineStatusLists', contacts)

  //1. loading first message
  useEffect(() => {

    socket.emit('getContacts', senderId)
    socket.on('contacts', (contacts) => {
      //setContacts(contacts)
      dispatch(contactList(contacts))
      
    })

  }, [])

  useEffect(() => {
    socket.on('contactsRefreshed', (contacts) => {
      //setContacts(contacts) setContacts will have been totally fine too
      dispatch(contactList(contacts))
      
    })
  }, [])



  return (
    
      <div className="surrounding_body" style={{
        height: "550px",
      }}>
          <div
          className="chat_body"
          style={{
              margin: "auto",
              backgroundColor: "white",
              height: "99%",
              overflowY: "scroll",
          }}>
        {  contacts.length > 0 ?
        <ConversationList>
          {contacts && contacts.map(contact => {
            console.log(contact)
            return (
              <div
              style={{
                paddingTop: "20px",
                paddingLeft: "20px",
                paddingRight: "20px",

            }}
              onClick={handlePush(contact)}>
                <Conversation 
                  name={contact.firstName + ' ' + contact.lastName} unreadCnt={contact.mPerC}  info={contact.message}>
                  <Avatar  src={`data:${contact.profilePicture.contentType};base64,${contact.profilePicture.data && contact.profilePicture.data}`} status={contact.onlineStatus? "available":"unavailable"}  />
                </Conversation>
             </div>
            )
          })
          }


        </ConversationList>
        :
        < div className="title_2 empty_contact">
         Contact is Empty
        </div>}
        </div>
      </div>


     
   
  )
}

export default ChatScreen
