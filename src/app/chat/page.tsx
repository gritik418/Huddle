"use client";
import ChatList from "@/components/ChatList/ChatList";
import ChatSection from "@/components/ChatSection/ChatSection";
import ChatSectionHeader from "@/components/ChatSectionHeader/ChatSectionHeader";
import IdleChat from "@/components/IdleChat/IdleChat";
import { JSX } from "react";

const Chat = (): JSX.Element => {
  return (
    <>
      <ChatSection>
        <ChatSectionHeader />
        <ChatList chatId={null} />
      </ChatSection>

      <IdleChat />
    </>
  );
};

export default Chat;
