import React from "react";
import Nav from "../components/nav/Nav";
import ChatBody from "../components/chatBody/ChatBody";

function ChatsScreen(props) {
  return (
    <div className="__main">
      <Nav />
      <ChatBody props={props} />
    </div>
  );
}

export default ChatsScreen;