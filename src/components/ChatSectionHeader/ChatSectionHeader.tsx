import { JSX } from "react";
import ChatNotificationMenu from "../ChatNotificationMenu/ChatNotificationMenu";
import ChatSearchBar from "../ChatSearchBar/ChatSearchBar";
import SendChatRequestDialog from "../SendChatRequestDialog/SendChatRequestDialog";

const ChatSectionHeader = (): JSX.Element => {
  return (
    <div className="h-16 border-b-2 px-3 border-gray-100 flex items-center p-2 gap-3">
      <ChatSearchBar />

      <div className="gap-1 flex">
        <SendChatRequestDialog />

        <ChatNotificationMenu />
      </div>
    </div>
  );
};

export default ChatSectionHeader;
