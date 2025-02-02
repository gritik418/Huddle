import ChatList from "@/components/ChatList/ChatList";
import ChatSection from "@/components/ChatSection/ChatSection";
import ChatSectionHeader from "@/components/ChatSectionHeader/ChatSectionHeader";
import MessageInput from "@/components/MessageInput/MessageInput";
import MessagePlayground from "@/components/MessagePlayground/MessagePlayground";
import MessageSection from "@/components/MessageSection/MessageSection";
import MessageSectionHeader from "@/components/MessageSectionHeader/MessageSectionHeader";
import Navbar from "@/components/Navbar/Navbar";
import { JSX } from "react";

const Chat = (): JSX.Element => {
  return (
    <div className="h-screen">
      <Navbar />

      <div className="flex h-[calc(100%-56px)]">
        <ChatSection>
          <ChatSectionHeader />
          <ChatList />
        </ChatSection>

        <MessageSection>
          <MessageSectionHeader />
          <MessagePlayground />
          <MessageInput />
        </MessageSection>
      </div>
    </div>
  );
};

export default Chat;
