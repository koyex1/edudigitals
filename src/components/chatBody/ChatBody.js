  
import React, { Component } from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import UserProfile from "../userProfile/UserProfile";

export default function ChatBody(props){
    return (
      <div className="main__chatbody">
        <ChatList props = {props} />
        <ChatContent props={props} />
      </div>
    );
  
}