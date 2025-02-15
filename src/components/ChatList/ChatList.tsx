"use client";
import React, { JSX } from "react";
import ChatListItem from "../ChatListItem/ChatListItem";
import Spinner from "../Spinner/Spinner";
import { useSelector } from "react-redux";
import { selectChats, selectChatsLoading } from "@/features/chat/chatSlice";

type PropsType = { chatId: string | null };

const ChatList = ({ chatId }: PropsType): JSX.Element => {
  const isLoading: boolean = useSelector(selectChatsLoading);
  const chats: Chat[] = useSelector(selectChats);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center my-3 justify-center">
          <Spinner variant="small" />
        </div>
      );
    }

    if (!chats || chats.length === 0) {
      return (
        <div className="flex items-center my-3 justify-center">
          <p className="text-xs">No chats at this moment.</p>
        </div>
      );
    }

    return chats.map((chat: Chat) => (
      <ChatListItem key={chat._id} chat={chat} chatId={chatId} />
    ));
  };
  return <div className="px-3">{renderContent()}</div>;
};

export default ChatList;
