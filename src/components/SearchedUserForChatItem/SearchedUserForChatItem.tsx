import Image from "next/image";
import React, { JSX } from "react";
import { BiSolidMessageAdd } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const SearchedUserForChatItem = (user: SearchedUserForChat): JSX.Element => {
  return (
    <div className="flex gap-2 bg-gray-200 p-2 items-center w-full rounded-lg justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-12 w-12 rounded-full">
          <Image
            src={user.profilePicture || "/images/default-profile.jpg"}
            alt="profile"
            height={50}
            width={50}
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">
            {user.firstName} {user.lastName}
          </p>

          <p className="text-xs font-medium text-gray-500">@{user.username}</p>
        </div>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex mr-2 cursor-pointer">
              <BiSolidMessageAdd className="text-2xl text-blue-500" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Send chat request</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SearchedUserForChatItem;
