import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';
import TextContainer from './TextContainer';
import './Chat.css';

let socket;

const Chat = ({location})=> {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([])

  // const ENDPOINT = 'https://react-chat-rooms.herokuapp.com/';
  const ENDPOINT = 'http://localhost:5001/first';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT);
    console.log(socket);

    setName(name);
    setRoom(room);

    socket.emit('join',{name, room}, () => {
    })

    socket.on("roomData", ({room, users}) => {
      setUsers(users);
    })
    
    return () => {
      socket.emit('disconnect');
      socket.off()
    }
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  },[messages])

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message, messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room}/>
        <Messages messages={messages} name={name} />

        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  )
}

export default Chat;