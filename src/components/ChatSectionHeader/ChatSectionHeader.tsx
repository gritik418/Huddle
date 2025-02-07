import { JSX } from "react";
import { IoIosNotifications } from "react-icons/io";
import ChatRequestDialog from "../ChatRequestDialog/ChatRequestDialog";
import ChatSearchBar from "../ChatSearchBar/ChatSearchBar";

const ChatSectionHeader = (): JSX.Element => {
  return (
    <div className="h-16 border-b-2 px-3 border-gray-100 flex items-center p-2 gap-3">
      <ChatSearchBar />

      <div className="gap-1 flex">
        <ChatRequestDialog />

        <div className="relative flex min-h-10 h-10 w-10 min-w-10 rounded-full items-center justify-center bg-gray-100">
          <IoIosNotifications />
          <span className="absolute h-2 w-2 bg-red-400 rounded-full top-1 right-1"></span>
        </div>
      </div>
    </div>
  );
};

export default ChatSectionHeader;
