import { JSX, useState } from "react";
import ChatList from "../ChatList/ChatList";
import ChatSectionHeader from "../ChatSectionHeader/ChatSectionHeader";

type PropsType = { chatId: string | null };

const ChatSection = ({ chatId }: PropsType): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div className="w-full md:w-[400px] border-r-2 border-gray-100 h-full">
      <ChatSectionHeader setSearchQuery={setSearchQuery} />
      <ChatList searchQuery={searchQuery} chatId={chatId} />
    </div>
  );
};

export default ChatSection;
