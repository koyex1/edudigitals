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
import { loginMessage, recipientDetails, tutorDetails } from '../actions/userActions';
import { messageList, newMessage } from '../actions/chatActions';
import socket from '../Config/socketConfig'


function ChatScreen(props) {

  //-------------contact list
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const senderId = userInfo && userInfo._id;
  const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch()
  const [inRoom, setInRoom] = useState(true)

  //-------chat content
  const parameters = props.location.search.split('&');
  const recipientId = parameters[0].substring(1)
  const firstName = parameters[1]
  const lastName = parameters[2]
  //const [messages, setMessages] = useState([]);
  const messageNo = useSelector(state => state.messageNo)
  const [typing, setTyping] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState();
  const messages = useSelector(state => state.messages)
  const recipientResult = useSelector(state => state.recipientResult)
  const { recipientInfo, error } = recipientResult;


  if(!userInfo){
   dispatch(loginMessage('You must be logged in first to access this page'))
    console.log(props.history.push('/signin'))
  }

useEffect(() => {
  dispatch(recipientDetails(recipientId))
}, [])
  
  //1. loading first message
  useEffect(() => {
    console.log('useEffect')
    socket.emit('loadMessages', senderId, recipientId)
    socket.on('firstMessage', data => {
      dispatch(messageList(data.allMessages))
    })
    //clear unread messages since i am just entering view now
   
    socket.emit('onlineStatus', recipientId)
    socket.on('isOnline', isOnline => {
      setOnlineStatus(isOnline);
    })

    
    

  }, [])

  useEffect(() => {
    if(messages){
      socket.emit('enteredMessage', userInfo && userInfo._id)
      socket.on('entered', data =>{
        dispatch(newMessage(data));
        console.log('read set to true with entering room')
      })
 }
  }, [messages])


  useEffect(() => {
    return () => {
  socket.emit('leaveRooms', senderId, recipientId)
    }
  }, [])


  //2. 2nd sending option
  const sendingOptionTwo = (sent) => {
    
    if (sent != "") {
      socket.emit('sendMessage', senderId, recipientId, sent);
      //first to load
     // setMessage([...messages, sent])
        socket.emit('loadMessages', senderId, recipientId)
        socket.on('finalMessages', data =>{
          dispatch(messageList(data.allMessages))
        })

        //clear unread messages because im already in view
         socket.emit('whenSendIsHit', recipientId)
         socket.on('sendIsHit', data =>{
           console.log('read set to true wit hit send button')
          dispatch(newMessage(data));
        })  
        
        socket.emit('getContacts', (recipientId))

    }}

    const typingStatus = () =>{
      socket.emit('typingStatus',senderId, recipientId)
      socket.on('typing', data=>{
        setTyping(data)
      })
    }
    useEffect(() => {
      setTimeout(() => {
        setTyping(false)
      }, 2000);
    }, [typing])

    console.log('eureka')
  //first to load between setMessage([...messages,sent])
  //and below
  // socket.on('initialMessages', allMessages => {
  //   setMessages(allMessages)
  // })

  //Date setup

var dateContent = ""

const dateFunction = (x) =>{
  
dateContent = (new Date(x.date - (new Date().getTimezoneOffset()))).toString().substring(4,15)  
 
}
var timeContent

const timeFunction = (x) =>{
  let hour = (new Date(x.date - 60000 * (new Date().getTimezoneOffset()))).getHours()
  const minute = (new Date(x.date - 60000 * (new Date().getTimezoneOffset()))).getMinutes()
  if (hour>12){
    hour = hour%12
    timeContent = hour + ":" + minute + "pm";
  }
  else{
    if(hour==0)
    {hour=12}
    timeContent = hour + ":" + minute + "am"
  }
}


  return (
    


    <div className="surrounding_body" style={{
      height: "550px",
    }}>
        <div className="chat_body" style={{
            margin: "auto",
            backgroundColor: "white",
            height: "90%",
        }}>
        < ConversationHeader >
          <Avatar src={recipientInfo?`data:${recipientInfo && recipientInfo.profilePicture.contentType};base64,${recipientInfo && Buffer.from(recipientInfo.profilePicture.data.data).toString('base64')}`:img} name={firstName + " " + lastName} status={onlineStatus? "available":"unavailable"} />
          
          <ConversationHeader.Content userName={firstName + " " + lastName} />
          <ConversationHeader.Actions>
            <InfoButton />
          </ConversationHeader.Actions>
        </ConversationHeader>

        <ChatContainer>

          <MessageList typingIndicator={typing && <TypingIndicator content="Typing..."/>} >


            {messages && messages.map(x => {
              return (
                <div>
                 
                  
                  {
            dateContent != (new Date(x.date - (new Date().getTimezoneOffset()))).toString().substring(4,15)
            ?
            <MessageSeparator style={{color: "#060b26ed"}} as="h2" >{dateFunction(x)}{dateContent}</MessageSeparator>
            :
            null
            }
            
                  <Message  style={{fontWeight: "bold"}} model={{
                    message: x.message,
                    sentTime: "15 mins ago",
                    sender: "Emily",
                    direction: x.sender == senderId ? "outgoing" : "incoming",
                    position: "single"
                  }} />
                  {timeFunction(x)}
                 <div className="edu_chat_time_flex">
                  <div className={x.sender == senderId ? "edu_chat_time edu_chat_time_sender": "edu_chat_time"}>{timeContent}</div>
                  </div>
                </div>
              )
            })


            }

            
          </MessageList>
          <MessageInput attachButton={false} onChange={typingStatus} onSend={sendingOptionTwo} placeholder="Type message here" />
        </ChatContainer>
      </div>
      </div>
  )
}

export default ChatScreen
