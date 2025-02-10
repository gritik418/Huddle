"use client";
import { AppDispatch } from "@/app/store";
import { MESSAGE_SENT, NEW_MESSAGE } from "@/constants/events";
import { useSocket } from "@/contexts/SocketContext/SocketProvider";
import { addMessage } from "@/features/message/messageSlice";
import { usePathname } from "next/navigation";
import React, { JSX, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";

const SocketHandler = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const socket: Socket | null = useSocket();
  const pathname: string = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const newMessageHandler = useCallback(({ message }: { message: Message }) => {
    if (pathname.includes(message.chatId)) {
      dispatch(addMessage(message));
    } else {
      // notify
    }
  }, []);

  const messageSentHandler = useCallback(
    ({ message }: { message: Message }) => {
      if (pathname.includes(message.chatId)) {
        dispatch(addMessage(message));
      }
    },
    []
  );

  useEffect(() => {
    socket?.on(NEW_MESSAGE, newMessageHandler);

    socket?.on(MESSAGE_SENT, messageSentHandler);

    return () => {
      socket?.off(NEW_MESSAGE);

      socket?.off(MESSAGE_SENT);
    };
  }, []);
  return <div>{children}</div>;
};

export default SocketHandler;
