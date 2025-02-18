"use client";
import { AppDispatch } from "@/app/store";
import {
  ACCEPTED_FOLLOW_REQUEST,
  MESSAGE_SENT,
  NEW_CHAT,
  NEW_CHAT_REQUEST,
  NEW_FOLLOW_REQUEST,
  NEW_MESSAGE,
  STATUS_UPDATE,
  USER_ONLINE,
} from "@/constants/events";
import { useSocket } from "@/contexts/socket/SocketProvider";
import { addChat } from "@/features/chat/chatSlice";
import { addChatRequest } from "@/features/chatRequest/chatRequestSlice";
import { addFollowRequest } from "@/features/followRequest/followRequestSlice";
import { addMessage } from "@/features/message/messageSlice";
import { addOnlineMember, removeOnlineMember } from "@/features/user/userSlice";
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

  const newfollowRequestHandler = useCallback(
    ({ followRequest }: { followRequest: FollowRequest }) => {
      if (followRequest._id) {
        dispatch(addFollowRequest(followRequest));
        toast(
          Notification({
            id: followRequest._id,
            type: "FOLLOW_REQUEST",
            followRequest,
          }),
          {
            hideProgressBar: true,
          }
        );
      }
    },
    [dispatch]
  );

  const newChatHandler = useCallback(
    ({ chat }: { chat: Chat }) => {
      if (chat._id) {
        dispatch(addChat(chat));
      }
    },
    [dispatch]
  );

  const statusUpdateHandler = useCallback(
    ({ userId, status }: { userId: string; status: string }) => {
      if (status === "ONLINE") {
        dispatch(addOnlineMember({ userId: userId.toString() }));
      } else {
        dispatch(removeOnlineMember({ userId: userId.toString() }));
      }
    },
    []
  );

  const acceptedFollowRequestHandler = useCallback(
    ({ status, receiver }: { status: string; receiver: Follower }) => {
      if (status === "Accepted") {
        toast(
          Notification({
            id: receiver._id,
            type: "ACCEPTED_FOLLOW_REQUEST",
            followRequestReceiver: receiver,
          }),
          {
            hideProgressBar: true,
          }
        );
      }
    },
    []
  );

  // ADDED_TO_GROUP, {chat,creator};

  useEffect(() => {
    if (!socket) return;

    socket.emit(USER_ONLINE);

    socket.on(NEW_MESSAGE, newMessageHandler);

    socket.on(MESSAGE_SENT, messageSentHandler);

    socket.on(NEW_CHAT_REQUEST, newChatRequestHandler);

    socket.on(NEW_FOLLOW_REQUEST, newfollowRequestHandler);

    socket.on(NEW_CHAT, newChatHandler);

    socket.on(STATUS_UPDATE, statusUpdateHandler);

    socket.on(ACCEPTED_FOLLOW_REQUEST, acceptedFollowRequestHandler);

    return () => {
      socket.off(NEW_MESSAGE, newMessageHandler);

      socket.off(MESSAGE_SENT, messageSentHandler);

      socket.off(NEW_CHAT_REQUEST, newChatRequestHandler);

      socket.off(NEW_FOLLOW_REQUEST, newfollowRequestHandler);

      socket.off(NEW_CHAT, newChatHandler);

      socket.off(STATUS_UPDATE, statusUpdateHandler);

      socket.off(ACCEPTED_FOLLOW_REQUEST, acceptedFollowRequestHandler);
    };
  }, [
    socket,
    newMessageHandler,
    messageSentHandler,
    newChatRequestHandler,
    newChatHandler,
    statusUpdateHandler,
  ]);
  return <div>{children}</div>;
};

export default SocketHandler;
