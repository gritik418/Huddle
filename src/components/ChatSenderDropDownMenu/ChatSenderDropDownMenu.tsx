import Link from "next/link";
import { JSX } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { MdBlock, MdDelete } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ChatSenderDropDownMenu = ({
  sender,
}: {
  sender: Follower;
}): JSX.Element => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex p-2 rounded-lg cursor-pointer bg-gray-200 items-center justify-center">
          <BsThreeDotsVertical />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          <Link href={`/user/${sender.username}`}>
            <DropdownMenuItem className="flex cursor-pointer text-xs font-medium items-center gap-2 w-full">
              <FaUserCircle className="text-gray-600" /> User Profile
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem className="text-xs gap-2 cursor-pointer font-medium">
            <GiBroom className="text-gray-600" /> Clear Chat
          </DropdownMenuItem>

          <DropdownMenuItem className="text-xs gap-2 cursor-pointer font-medium">
            <MdDelete className="text-gray-600" /> Delete Chat
          </DropdownMenuItem>

          <DropdownMenuItem className="text-xs gap-2 cursor-pointer font-medium">
            <MdBlock className="text-gray-600" /> Block User
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatSenderDropDownMenu;
