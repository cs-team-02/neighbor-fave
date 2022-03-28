import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import useAuth from '../utils/useAuthHook';
export const socket = io.connect('http://localhost:8080');

function ChatForm(props) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  const currentUser = useAuth();
  useEffect(async () => {
    await setUsername(currentUser.name);
    await setRoom(props.match.params.id);
    joinRoom();
  }, []);

  // console.log('--------', props.match.params.id);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Let's chat!</h3>
          {/* <input
            type="text"
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          /> */}
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ChatForm;
