import Image from "next/image";
import React, { JSX } from "react";

const ChatListItem = ({
  firstName,
  lastMessage,
  lastName,
  profilePicture,
}: {
  profilePicture: string;
  firstName: string;
  lastName: string;
  lastMessage: string;
}): JSX.Element => {
  let isSelected: boolean = false;
  if (firstName == "John") {
    isSelected = true;
  }
  return (
    <div
      className={`flex items-center my-2 p-2 rounded-xl justify-between ${
        isSelected ? "bg-[var(--secondary)]" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full">
          <Image
            src={profilePicture}
            alt="proofile-image"
            className="h-12 w-12 rounded-full object-cover"
            height={48}
            width={48}
          />
        </div>

        <div className="flex flex-col">
          <p
            className={`text-sm font-semibold ${
              isSelected ? "text-white" : "text-black"
            }`}
          >
            {firstName} {lastName}
          </p>

          <p
            className={`text-xs text-gray-400 font-medium ${
              isSelected ? "text-gray-50" : "text-black"
            }`}
          >
            {lastMessage}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p
          className={`text-[10px] font-semibold ${
            isSelected ? "text-white" : "text-black"
          }`}
        >
          11:40
        </p>

        <p className="text-[9px] font-semibold bg-red-400 h-4 w-4 rounded-full flex items-center justify-center text-white">
          9+
        </p>
      </div>
    </div>
  );
};

export default ChatListItem;
