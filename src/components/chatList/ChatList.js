import React, {useState, useEffect } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import io from 'socket.io-client';
import { useSelector } from "react-redux";


const endpoint ='http://localhost:5000/';
//const endpoint = 'https://edudigital.herokuapp.com'

let socket;
socket = io(endpoint);

export default function ChatList (props)  {

  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;
  const senderId = userInfo._id;
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    socket.emit('getContacts', senderId)
    socket.on('contacts', (contacts)=>{
    setContacts(contacts)
    
    })
  }, [contacts, senderId])

  const handlePush = (e) => {
   // const parameters = props.props.props.history.push(`/chats?${recipientId}&${recipientName}`);
console.log(e)
  }
      return (
      <div className="main__chatlist">
        <div className="chatlist__heading">
          <h2>Chats</h2>
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="chatlist__items">
         {/* {console.log(contacts)} */}
          {contacts && contacts.map((contact, index) => {
            return (
              <ChatListItems
                props ={props}
                firstName={contact.firstName}
                lastName={contact.lastName}
                name={contact.firstName + ' ' + contact.lastName}
                key={contact._id}
                recipientId={contact._id}
                animationDelay={index + 1}
                handlePush={handlePush}
                // active={item.active ? "active" : ""}
                // isOnline={item.isOnline ? "active" : ""}
                // image={item.image}
              />
            );
          })}
        </div>
      </div>
    );

}