import React, { JSX } from "react";
import ChatSearchBar from "../ChatSearchBar/ChatSearchBar";
import { FiPlus } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";

const ChatSectionHeader = (): JSX.Element => {
  return (
    <div className="h-16 border-b-[1px] flex items-center p-2 gap-3">
      <ChatSearchBar />

      <div className="gap-1 flex">
        <div className="flex min-h-10 h-10 w-10 min-w-10 rounded-full items-center justify-center bg-gray-100">
          <FiPlus />
        </div>

        <div className="relative flex min-h-10 h-10 w-10 min-w-10 rounded-full items-center justify-center bg-gray-100">
          <IoIosNotifications />
          <span className="absolute h-2 w-2 bg-red-400 rounded-full top-1 right-1"></span>
        </div>
      </div>
    </div>
  );
};

export default ChatSectionHeader;
