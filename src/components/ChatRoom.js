// import SocketIOClient from "socket.io-client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

import Message from "./Message";

export default function ChatRoom() {
  // const socket = SocketIOClient(process.env.REACT_APP_API_URL);

  let { id } = useParams();

  // useEffect(() => {
  //   return () => {
  //     socket.disconnect();
  //   };
  // });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen w-2/4 text-center overflow-hidden">
      <div className="h-16 border-2 border-opacity-30 rounded-xl my-3 flex items-center justify-center hover:border-opacity-60">
        <h1 className="font-bold text-2xl text-gray-200 ">Room id: {id}</h1>
      </div>

      <div className="w-full h-4/5 border-2 border-opacity-30 rounded-xl my-3 hover:border-opacity-60">
        <Message />
      </div>

      <form onSubmit={submitHandler} className="h-16 relative">
        <input
          type="text"
          className="w-full h-full border-2 border-opacity-30 rounded-xl bg-transparent outline-none text-gray-100 pl-3 pr-10 hover:border-opacity-60"
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
