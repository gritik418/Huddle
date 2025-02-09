"use client";
import ChatList from "@/components/ChatList/ChatList";
import ChatSection from "@/components/ChatSection/ChatSection";
import ChatSectionHeader from "@/components/ChatSectionHeader/ChatSectionHeader";
import MessageInput from "@/components/MessageInput/MessageInput";
import MessagePlayground from "@/components/MessagePlayground/MessagePlayground";
import MessageSection from "@/components/MessageSection/MessageSection";
import MessageSectionHeader from "@/components/MessageSectionHeader/MessageSectionHeader";
import Spinner from "@/components/Spinner/Spinner";
import { useParams } from "next/navigation";
import React, { JSX } from "react";

const SelectedChat = (): JSX.Element => {
  const params: { chatId: string } = useParams();

  if (!params) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Spinner variant="medium" />
      </div>
    );
  }

  const { chatId } = params;

  return (
    <>
      <div className="hidden md:flex">
        <ChatSection>
          <ChatSectionHeader />
          <ChatList chatId={chatId} />
        </ChatSection>
      </div>

      <MessageSection>
        <MessageSectionHeader />
        <MessagePlayground />
        <MessageInput />
      </MessageSection>
    </>
  );
};

export default SelectedChat;
