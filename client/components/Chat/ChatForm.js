import io from 'socket.io-client';
import React, { useState } from 'react';
import Chat from './Chat';

export const socket = io.connect('http://localhost:8080');

function ChatForm() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  return <div></div>;
}

export default ChatForm;
