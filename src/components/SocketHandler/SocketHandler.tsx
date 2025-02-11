"use client";
import { AppDispatch } from "@/app/store";
import {
  MESSAGE_SENT,
  NEW_CHAT_REQUEST,
  NEW_MESSAGE,
} from "@/constants/events";
import { useSocket } from "@/contexts/socket/SocketProvider";
import { addChatRequest } from "@/features/chatRequest/chatRequestSlice";
import { addMessage } from "@/features/message/messageSlice";
import { usePathname } from "next/navigation";
import React, { JSX, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";
import Notification from "../Notification/Notification";

const SocketHandler = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const socket: Socket | null = useSocket();
  const pathname: string = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const newMessageHandler = useCallback(
    ({ message }: { message: Message }) => {
      if (pathname.includes(message.chatId.toString())) {
        dispatch(addMessage(message));
      } else {
        toast(
          Notification({
            id: message.chatId,
            type: "NEW_MESSAGE",
            message: message,
          }),
          {
            hideProgressBar: true,
          }
        );
      }
    },
    [pathname, dispatch]
  );

  const messageSentHandler = useCallback(
    ({ message }: { message: Message }) => {
      if (pathname.includes(message.chatId)) {
        dispatch(addMessage(message));
      }
    },
    [pathname, dispatch]
  );

  const newChatRequestHandler = useCallback(
    ({ chatRequest }: { chatRequest: ChatRequest }) => {
      if (chatRequest._id) {
        dispatch(addChatRequest(chatRequest));
        toast(
          Notification({
            id: chatRequest._id,
            type: "CHAT_REQUEST",
            chatRequest,
          }),
          {
            hideProgressBar: true,
          }
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (!socket) return;

    socket?.on(NEW_MESSAGE, newMessageHandler);

    socket?.on(MESSAGE_SENT, messageSentHandler);

    socket?.on(NEW_CHAT_REQUEST, newChatRequestHandler);

    return () => {
      socket?.off(NEW_MESSAGE, newMessageHandler);

      socket?.off(MESSAGE_SENT, messageSentHandler);

      socket?.off(NEW_CHAT_REQUEST, newChatRequestHandler);
    };
  }, [socket, newMessageHandler, messageSentHandler, newChatRequestHandler]);
  return <div>{children}</div>;
};

export default SocketHandler;
