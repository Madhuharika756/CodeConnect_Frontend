import { io } from "socket.io-client";

let socket;

export const createSocketConnection = () => {
  if (!socket) {
    socket = io("http://localhost:1399", {
      withCredentials: true,
    });
  }
  return socket;
};
