import ChatList from "@/components/ChatList/ChatList";
import ChatSection from "@/components/ChatSection/ChatSection";
import ChatSectionHeader from "@/components/ChatSectionHeader/ChatSectionHeader";
import IdleChat from "@/components/IdleChat/IdleChat";
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

        <IdleChat />
      </div>
    </div>
  );
};

export default Chat;
