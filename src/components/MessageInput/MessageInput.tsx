import React from "react";
import { BsFillSendFill } from "react-icons/bs";

const MessageInput = () => {
  return (
    <div className="h-20 bg-[#f2f2f2] flex items-start justify-center">
      <div className="flex h-14 bg-white w-[90%] gap-2 pl-5 rounded-full items-center p-1 justify-between">
        <input
          type="text"
          placeholder="Type here..."
          className="flex-1 outline-none text-lg text-gray-500"
        />
        <div className="flex h-12 w-12 rounded-full bg-[var(--secondary)] items-center justify-center">
          <BsFillSendFill className="text-white text-lg" />
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
