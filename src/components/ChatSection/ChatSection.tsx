import { useGetChatsQuery } from "@/features/api/chatApi";
import { JSX } from "react";
import ChatList from "../ChatList/ChatList";
import ChatSectionHeader from "../ChatSectionHeader/ChatSectionHeader";

type PropsType = { chatId: string | null };

const ChatSection = ({ chatId }: PropsType): JSX.Element => {
  useGetChatsQuery();

  return (
    <div className="w-full md:w-[400px] border-r-2 border-gray-100 h-full">
      <ChatSectionHeader />
      <ChatList chatId={chatId} />
    </div>
  );
};

export default ChatSection;
