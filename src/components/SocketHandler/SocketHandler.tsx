"use client";

import { AppDispatch } from "../../app/store";
import {
  ACCEPTED_FOLLOW_REQUEST,
  ADDED_TO_GROUP,
  CHANNEL_MESSAGE_SENT,
  MESSAGE_SENT,
  NEW_CHANNEL_MESSAGE,
  NEW_CHAT,
  NEW_CHAT_REQUEST,
  NEW_FOLLOW_REQUEST,
  NEW_MENTION,
  NEW_MESSAGE,
  STATUS_UPDATE,
  UNSEND_MESSAGE,
  USER_ONLINE,
} from "../../constants/events";
import { useSocket } from "../../contexts/socket/SocketProvider";
import {
  addChat,
  removeLastMessage,
  updateLastMessage,
} from "../../features/chat/chatSlice";
import { addChatRequest } from "../../features/chatRequest/chatRequestSlice";
import { addFollowRequest } from "../../features/followRequest/followRequestSlice";
import { addMessage, removeMessage } from "../../features/message/messageSlice";
import {
  addOnlineMember,
  removeOnlineMember,
} from "../../features/user/userSlice";
import { usePathname } from "next/navigation";
import React, { JSX, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";
import Notification from "../Notification/Notification";
import { addToChannelMessages } from "../../features/channel/channelSlice";
import { selectNotificationSettings } from "../../features/notificationSettings/notificationSettingsSlice";

const SocketHandler = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const socket: Socket | null = useSocket();
  const pathname: string = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const notificationSettings = useSelector(selectNotificationSettings);

  const newMessageHandler = useCallback(
    ({ message, chat }: { message: Message; chat: Chat }) => {
      dispatch(
        updateLastMessage({
          chatId: message.chatId,
          lastMessage: {
            _id: message._id,
            sender: message.sender._id,
            content: message.content,
            updatedAt: message.updatedAt,
          },
        })
      );
      if (pathname.includes(message.chatId.toString())) {
        dispatch(addMessage(message));
      } else if (notificationSettings?.allowNewMessageNotification) {
        toast(
          Notification({
            id: message.chatId,
            chat: chat,
            type: "NEW_MESSAGE",
            message: message,
          }),
          {
            hideProgressBar: true,
            autoClose: 1000,
          }
        );
      }
    },
    [pathname, dispatch, notificationSettings]
  );

  const messageSentHandler = useCallback(
    ({ message }: { message: Message }) => {
      if (pathname.includes(message.chatId)) {
        dispatch(addMessage(message));
      }
      dispatch(
        updateLastMessage({
          chatId: message.chatId,
          lastMessage: {
            _id: message._id,
            sender: message.sender._id,
            content: message.content,
            updatedAt: message.updatedAt,
          },
        })
      );
    },
    [pathname, dispatch]
  );

  const newChatRequestHandler = useCallback(
    ({ chatRequest }: { chatRequest: ChatRequest }) => {
      if (chatRequest._id) {
        dispatch(addChatRequest(chatRequest));
        if (notificationSettings?.allowChatRequestNotification) {
          toast(
            Notification({
              id: chatRequest._id,
              type: "CHAT_REQUEST",
              chatRequest,
            }),
            {
              hideProgressBar: true,
              autoClose: 1000,
            }
          );
        }
      }
    },
    [dispatch, notificationSettings]
  );

  const newfollowRequestHandler = useCallback(
    ({ followRequest }: { followRequest: FollowRequest }) => {
      if (followRequest._id) {
        dispatch(addFollowRequest(followRequest));
        if (notificationSettings?.allowFollowRequestNotification) {
          toast(
            Notification({
              id: followRequest._id,
              type: "FOLLOW_REQUEST",
              followRequest,
            }),
            {
              hideProgressBar: true,
              autoClose: 1000,
            }
          );
        }
      }
    },
    [dispatch, notificationSettings]
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
    [dispatch]
  );

  const acceptedFollowRequestHandler = useCallback(
    ({ status, receiver }: { status: string; receiver: Follower }) => {
      if (
        status === "Accepted" &&
        notificationSettings?.allowAcceptedFollowRequestNotification
      ) {
        toast(
          Notification({
            id: receiver._id,
            type: "ACCEPTED_FOLLOW_REQUEST",
            followRequestReceiver: receiver,
          }),
          {
            hideProgressBar: true,
            autoClose: 1000,
          }
        );
      }
    },
    [notificationSettings]
  );

  const newMentionHandler = useCallback(
    ({ postId, creator }: { postId: string; creator: Follower }) => {
      if (postId && notificationSettings?.allowNewMentionNotification) {
        toast(
          Notification({
            id: postId,
            type: "NEW_MENTION",
            creator,
            postId: postId,
          }),
          {
            hideProgressBar: true,
            autoClose: 1000,
          }
        );
      }
    },
    [notificationSettings]
  );

  const unsendMessageHandler = useCallback(
    ({ chatId, messageId }: { chatId: string; messageId: string }) => {
      if (pathname.includes(chatId)) {
        dispatch(removeMessage(messageId));
      }

      dispatch(
        removeLastMessage({
          chatId: chatId,
          lastMessage: {
            _id: messageId,
          },
        })
      );
    },
    [dispatch, pathname]
  );

  const addedToGroupHandler = useCallback(
    ({ chat, creator }: { chat: Chat; creator: Follower }) => {
      if (chat._id) {
        dispatch(addChat(chat));
        if (notificationSettings?.allowAddedToGroupNotification) {
          toast(
            Notification({
              id: `${chat._id}+${creator._id}`,
              type: "ADDED_TO_GROUP",
              creator,
              chat,
            }),
            {
              hideProgressBar: true,
              autoClose: 1000,
            }
          );
        }
      }
    },
    [dispatch, notificationSettings]
  );

  const channelMessageSentHandler = useCallback(
    ({ message }: { message: ChannelMessage }) => {
      if (pathname.includes(message.channelId)) {
        dispatch(addToChannelMessages(message));
      }
    },
    [pathname, dispatch]
  );

  const newChannelMessageHandler = useCallback(
    ({ message, channel }: { message: ChannelMessage; channel: Channel }) => {
      if (pathname.includes(channel._id.toString())) {
        dispatch(addToChannelMessages(message));
      } else if (notificationSettings?.allowNewChannelMessageNotification) {
        toast(
          Notification({
            id: message._id,
            channel: channel,
            type: "NEW_CHANNEL_MESSAGE",
            channelMessage: message,
          }),
          {
            hideProgressBar: true,
            autoClose: 1000,
          }
        );
      }
    },
    [pathname, dispatch, notificationSettings]
  );

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
    socket.on(NEW_MENTION, newMentionHandler);
    socket.on(UNSEND_MESSAGE, unsendMessageHandler);
    socket.on(ADDED_TO_GROUP, addedToGroupHandler);
    socket.on(CHANNEL_MESSAGE_SENT, channelMessageSentHandler);
    socket.on(NEW_CHANNEL_MESSAGE, newChannelMessageHandler);

    return () => {
      socket.off(NEW_MESSAGE, newMessageHandler);
      socket.off(MESSAGE_SENT, messageSentHandler);
      socket.off(NEW_CHAT_REQUEST, newChatRequestHandler);
      socket.off(NEW_FOLLOW_REQUEST, newfollowRequestHandler);
      socket.off(NEW_CHAT, newChatHandler);
      socket.off(STATUS_UPDATE, statusUpdateHandler);
      socket.off(ACCEPTED_FOLLOW_REQUEST, acceptedFollowRequestHandler);
      socket.off(NEW_MENTION, newMentionHandler);
      socket.off(UNSEND_MESSAGE, unsendMessageHandler);
      socket.off(ADDED_TO_GROUP, addedToGroupHandler);
      socket.off(CHANNEL_MESSAGE_SENT, channelMessageSentHandler);
      socket.off(NEW_CHANNEL_MESSAGE, newChannelMessageHandler);
    };
  }, [
    socket,
    newChatHandler,
    newMentionHandler,
    newMessageHandler,
    messageSentHandler,
    addedToGroupHandler,
    statusUpdateHandler,
    unsendMessageHandler,
    newChatRequestHandler,
    newfollowRequestHandler,
    newChannelMessageHandler,
    channelMessageSentHandler,
    acceptedFollowRequestHandler,
  ]);

  return <div>{children}</div>;
};

export default SocketHandler;
