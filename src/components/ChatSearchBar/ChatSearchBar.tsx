import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const ChatSearchBar = () => {
  return (
    <div className="border-2 bg-gray-100 h-10 border-gray-100 flex rounded-full p-2 w-full items-center gap-2">
      <IoSearchOutline className="ml-1 text-gray-500 text-xl" />
      <input
        type="text"
        placeholder="Search here..."
        className="outline-none bg-transparent flex-1"
      />
    </div>
  );
};

export default ChatSearchBar;
