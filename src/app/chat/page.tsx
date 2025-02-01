import ChatList from "@/components/ChatList/ChatList";
import ChatSection from "@/components/ChatSection/ChatSection";
import ChatSectionHeader from "@/components/ChatSectionHeader/ChatSectionHeader";
import Navbar from "@/components/Navbar/Navbar";
import { JSX } from "react";

const Chat = (): JSX.Element => {
  return (
    <div className="h-screen">
      <Navbar />

      <ChatSection>
        <ChatSectionHeader />
        <ChatList />
      </ChatSection>
    </div>
  );
};

export default Chat;
