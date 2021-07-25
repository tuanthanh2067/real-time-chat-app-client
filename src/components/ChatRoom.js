import SocketIOClient from "socket.io-client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ChatRoom() {
  const socket = SocketIOClient(process.env.REACT_APP_API_URL);

  let { id } = useParams();

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  });

  return (
    <div>
      <h1>Room Id: {id}</h1>
    </div>
  );
}
