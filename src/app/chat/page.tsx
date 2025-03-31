"use client";
import ChatSection from "../../components/ChatSection/ChatSection";
import IdleChat from "../../components/IdleChat/IdleChat";
import { useGetChatsQuery } from "../../features/api/chatApi";
import { JSX } from "react";

const Chat = (): JSX.Element => {
  useGetChatsQuery();
  return (
    <>
      <ChatSection chatId={null} />

      <IdleChat />
    </>
  );
};

export default Chat;
