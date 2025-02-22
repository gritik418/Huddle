"use client";
import React, { JSX, useEffect, useState } from "react";
import ChatListItem from "../ChatListItem/ChatListItem";
import Spinner from "../Spinner/Spinner";
import { useSelector } from "react-redux";
import { selectChats, selectChatsLoading } from "@/features/chat/chatSlice";
import { selectUser } from "@/features/user/userSlice";
import ChatItemSkeleton from "../ChatItemSkeleton/ChatItemSkeleton";

type PropsType = { chatId: string | null; searchQuery: string | null };

const ChatList = ({ chatId, searchQuery }: PropsType): JSX.Element => {
  const isLoading: boolean = useSelector(selectChatsLoading);
  const user: User | null = useSelector(selectUser);
  const chats: Chat[] = useSelector(selectChats);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const matchedChats = chats.filter((chat: Chat) => {
        if (chat.isGroupChat && chat.groupName) {
          return chat?.groupName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        } else {
          const sender: ChatMember = chat.members.filter(
            (member: ChatMember) => member._id !== user?._id
          )[0];
          const query = sender.firstName
            .concat(sender.lastName || "")
            .concat(sender.username);
          return query.toLowerCase().includes(searchQuery.toLowerCase());
        }
      });
      setFilteredChats(matchedChats);
    } else {
      setFilteredChats(chats);
    }
  }, [searchQuery, chats]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center">
          <ChatItemSkeleton />
          <ChatItemSkeleton />
          <ChatItemSkeleton />
          <ChatItemSkeleton />
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

    if (filteredChats.length === 0) {
      return (
        <div className="flex items-center my-3 justify-center">
          <p className="text-xs">No chats found matching your search.</p>
        </div>
      );
    }

    return filteredChats.map((chat: Chat) => (
      <ChatListItem key={chat._id} chat={chat} chatId={chatId} />
    ));
  };

  return <div className="px-3">{renderContent()}</div>;
};

export default ChatList;
