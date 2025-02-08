import React, { JSX } from "react";
import { IoSearchOutline } from "react-icons/io5";

const ChatSearchBar = (): JSX.Element => {
  return (
    <div className="bg-[#f2f2f2] px-4 h-10 w-[calc(100%-90px)] flex rounded-full p-2 items-center gap-2">
      <input
        type="text"
        placeholder="Search here..."
        className="outline-none bg-transparent flex-1"
      />
      <IoSearchOutline className="ml-1 text-gray-500 text-xl" />
    </div>
  );
};

export default ChatSearchBar;
