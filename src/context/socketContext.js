import { createContext, useEffect } from "react";
import SocketIoClient from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = SocketIoClient(process.env.REACT_APP_API_URL);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
