"use client";
import ChatSection from "@/components/ChatSection/ChatSection";
import IdleChat from "@/components/IdleChat/IdleChat";
import { JSX } from "react";

const Chat = (): JSX.Element => {
  return (
    <>
      <ChatSection chatId={null} />

      <IdleChat />
    </>
  );
};

export default Chat;
