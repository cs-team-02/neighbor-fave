import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import useAuth from "../utils/useAuthHook";
export const socket = io.connect(window.location.origin);

function ChatForm(props) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const currentUser = useAuth();

  useEffect(() => {
    const asyncfunc = async () => {
      await setRoom(props.match.params.id);
      await setUsername(currentUser.name);
      joinRoom();
    };
    asyncfunc().then(console.log("hello"));
  }, []);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="chatbox">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Let's chat!</h3>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ChatForm;
