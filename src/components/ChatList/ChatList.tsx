"use client";
import React, { JSX } from "react";
import ChatListItem from "../ChatListItem/ChatListItem";
import { useGetChatsQuery } from "@/features/api/chatApi";
import Spinner from "../Spinner/Spinner";

type PropsType = { chatId: string | null };

const ChatList = ({ chatId }: PropsType): JSX.Element => {
  const { isLoading, data, error } = useGetChatsQuery();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center my-3 justify-center">
          <Spinner variant="small" />
        </div>
      );
    }

    if (error || !data) {
      return (
        <div className="flex items-center my-3 justify-center">
          <p className="text-xs">No chats at this moment.</p>
        </div>
      );
    }

    if (error || !data?.chats?.length) {
      return (
        <div className="flex items-center my-3 justify-center">
          <p className="text-xs">No chats at this moment.</p>
        </div>
      );
    }

    return data?.chats.map((chat: Chat) => (
      <ChatListItem key={chat._id} chat={chat} chatId={chatId} />
    ));
  };
  return <div className="px-3">{renderContent()}</div>;
};

export default ChatList;
