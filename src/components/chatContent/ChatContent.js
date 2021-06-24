import React, { useState, createRef, useEffect, useRef } from "react";
import io from 'socket.io-client';
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import {firstToUpper} from "../../data/data";
import { useSelector } from "react-redux";
import {FileAddOutlined } from '@ant-design/icons';

const endpoint ='http://localhost:5000/';
//const endpoint = 'https://edudigital.herokuapp.com';

let socket;
socket = io(endpoint);

export default function ChatContent(props){
  const messagesEndRef = useRef();
  const parameters=props.props.props.location.search.split('&');
    const recipientId= parameters[0].substring(1)
    const firstName =parameters[1]
    const lastName = parameters[2]

    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    const senderId = userInfo._id;

    
  console.log("loner")
  socket.emit('loadMessages', senderId , recipientId)

//1. loading first message
  useEffect(() => {
    console.log("tell me something")
    //socket.emit('loadMessages', senderId , recipientId)
    socket.on('initialMessages', allMessages=>{
      setMessages(allMessages)
  })
  scrollToBottom();
  }, [messages])
  
  //2. 2nd sending option
  const sendingOptionTwo = ()=>{
    if (message != "") {
      socket.emit('sendMessage', senderId, recipientId, message);
      socket.on('initialMessages', allMessages=>{
        setMessages([...allMessages, message])
    })
    }
    scrollToBottom();
  }

//3. on ENTER button
useEffect(() => {
  window.addEventListener("keydown", (e) => {
        
    if (e.key == 'Enter') {
 
      if (message != "") {
        socket.emit('sendMessage', senderId, recipientId, message);
       // socket.emit('loadMessages', senderId , recipientId)
        socket.on('initialMessages', allMessages=>{
          setMessages([...allMessages, message])
      })
      scrollToBottom();
      }
    }
  });
}, [messages])

       
      
    
//-------on input change for typing
  const onStateChange = (e) => {
    setMessage( e.target.value );
  };

  //scrool to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
 
    return (
      <div className="main__chatcontent">
        {console.log("render")}
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              />
              <p>{firstToUpper(firstName)} {firstToUpper(lastName)}</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {messages.map((message, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={message._id}
                  user={message.sender == senderId ? "me" : "other"}
                  msg={message.message}
                  //image={message.image}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
            <i class='bx bx-book-add' ></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={onStateChange}
            //  value={this.state.msg}
            />
            <button onClick={sendingOptionTwo} className="btnSendMsg" id="sendMsgBtn">
            <i class='bx bx-send'></i>
            </button>
          </div>
        </div>
      </div>
    );
  
}