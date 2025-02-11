import Image from "next/image";
import React, { JSX } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ChatRequestItem = (user: ChatRequestSender): JSX.Element => {
  return (
    <div className="flex justify-between items-center gap-5 hover:bg-gray-50 p-1 rounded-md">
      <div className="flex items-center gap-1">
        <div className="flex h-12 w-12 rounded-full">
          <Image
            src={user?.profilePicture || "/images/default-profile.jpg"}
            alt="profile"
            height={50}
            width={50}
            className="h-12 w-12 rounded-full"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-semibold">
            {user.firstName} {user?.lastName}
          </p>

          <p className="text-xs font-medium text-gray-500">@{user.username}</p>
        </div>
      </div>

      <div className="flex gap-2 mx-2">
        <div className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-md text-red-400 bg-red-100">
          <MdDelete />
        </div>

        <div className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-md text-green-500 bg-green-100">
          <FaCheck />
        </div>
      </div>
    </div>
  );
};

export default ChatRequestItem;
