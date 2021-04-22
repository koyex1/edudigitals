import React, { useState, createRef, useEffect, useRef } from "react";
import io from 'socket.io-client';
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import {firstToUpper} from "../../data/data";
import { useSelector } from "react-redux";
import {FileAddOutlined } from '@ant-design/icons';

const Endpoint ='http://localhost:5000/';

let socket;

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

    socket = io(Endpoint);

    
    socket.emit('loadMessages', senderId , recipientId)
  

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
     
    socket.on('initialMessages', allMessages=>{
      setMessages(allMessages)
      // console.log(allMessages)
  })
 
  
      window.addEventListener("keydown", (e) => {
        if (e.keyCode == 13) {
          if (message != "") {
            socket.emit('sendMessage', senderId, recipientId, message);
            socket.emit('loadMessages', senderId , recipientId)
            socket.on('initialMessages', allMessages=>{
              setMessages(allMessages)
              //
          })
          scrollToBottom();
            //setMessage("");
          }
        }
      });
      scrollToBottom();
    
  }, [message,messages, recipientId, senderId])

  
  const onStateChange = (e) => {
    setMessage( e.target.value );
  };

 
 
    return (
      <div className="main__chatcontent">
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
              // console.log(message.sender + ' ' + senderId)
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
            <button className="btnSendMsg" id="sendMsgBtn">
            <i class='bx bx-send'></i>
            </button>
          </div>
        </div>
      </div>
    );
  
}