import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Input } from 'antd';
import { useSelector } from 'react-redux';

const { Search } = Input;

const Endpoint ='http://localhost:5000/';

let socket;

function MessageScreen(props) {

    const parameters=props.location.search.split('&');
    const recipientId= parameters[0].substring(1)
    const firstName =parameters[1]
    const lastName = parameters[2]

    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    const senderId = userInfo._id;

    const bubbleRef= useRef();
    console.log(bubbleRef.className)
    console.log(bubbleRef.classList)

  

    socket = io(Endpoint);
    
    
    socket.on('initialMessages', allMessages=>{
        setMessages(allMessages)
        console.log(allMessages)
    })
    
    const onSend = ()=>{
        socket.emit('sendMessage', senderId, recipientId, message);
        socket.emit('loadMessages', senderId , recipientId)
    }

    useEffect(() => {
        console.log('useeffect')
        socket.emit('loadMessages', senderId , recipientId)
    }, [])

    

    return (

        <div className="edu_message_container">
            <div className="edu_message_header">
            <p>{firstName} {lastName}</p>
            <img className="edu_contact_image" src=" ../images/dp.jpg"/>
            </div>

            <div className="edu_message_scroll">
                <div className="edu_message_bubble">
            { messages.map(message=>(
                
                <div key={message._id} ref={bubbleRef}  className="edu_name_time">
                    <p className="edu_message_right">{message.message}</p>
                    <p className="edu_message_time">{message.Date}</p>
                </div>
            ))}
            </div>
            </div>
            <Search
        placeholder="input search text"
        allowClear
        enterButton="Send"
        size="large"
        onSearch={onSend}
        onChange={e=>{setMessage(e.target.value)}}
      />

        </div>
        
    )
}

export default MessageScreen
