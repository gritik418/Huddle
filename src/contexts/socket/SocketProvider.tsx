"use client";
import React, { JSX, useContext, useMemo } from "react";
import SocketContext from "./SocketContext";
import { io, Socket } from "socket.io-client";

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const socket: Socket = useMemo(
    () =>
      io("ws://localhost:8080", {
        withCredentials: true,
        transports: ["websocket"],
        reconnection: true,
      }),
    []
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
