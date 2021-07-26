import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";

import { UserContext } from "../context/userContext";
import { SocketContext } from "../context/socketContext";

import Message from "./Message";

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { userId } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const history = useHistory();

  let { id } = useParams();

  useEffect(() => {
    if (userId && id) {
      socket.emit("join", { userId: userId, roomId: id });

      socket.on("notification", ({ title }) => {
        setMessages((messages) => [
          ...messages,
          { userId: "admin", text: title },
        ]);
      });

      socket.on("message", ({ userId, text }) => {
        setMessages((messages) => [
          ...messages,
          { userId: userId, text: text },
        ]);
      });

      return () => {
        socket.emit("leave");
      };
    }
  }, [socket, id, userId]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (message.trim(" ") === "") return;
    socket.emit("message", { message: message });

    setMessage("");
  };

  const leaveHandler = () => {
    socket.emit("leave");
    history.push("/");
  };

  return (
    <div className="container h-screen text-center overflow-hidden px-3 py-3">
      <div className="h-16 border-2 border-opacity-30 rounded-xl my-3 flex items-center justify-between hover:border-opacity-60">
        <button className="mx-4" onClick={leaveHandler}>
          <FaArrowLeft className="text-gray-100 text-xl" />
        </button>

        <h1 className="font-bold text-xl text-gray-200 mx-4">Room id: {id}</h1>
      </div>

      <div className="w-full h-4/5 border-2 border-opacity-30 rounded-xl my-3 hover:border-opacity-60 overflow-y-auto">
        {messages.map((message, index) => (
          <Message
            message={message}
            key={index}
            me={message.userId === userId}
          />
        ))}
      </div>

      <form onSubmit={submitHandler} className="h-16 relative">
        <input
          type="text"
          className="w-full h-full border-2 border-opacity-30 rounded-xl bg-transparent outline-none text-gray-100 pl-3 pr-10 hover:border-opacity-60"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <button
          type="submit"
          className="absolute top-1/2 right-3 transform -translate-y-1/2"
        >
          <FaPaperPlane className="text-gray-100 text-xl" />
        </button>
      </form>
    </div>
  );
}
