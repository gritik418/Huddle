import Link from "next/link";
import { JSX } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { ImExit } from "react-icons/im";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const GroupOptionsDropDownMenu = ({
  chatId,
}: {
  chatId: string;
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
          <Link href={`/group/${chatId}`}>
            <DropdownMenuItem className="flex cursor-pointer text-xs font-medium items-center gap-2 w-full">
              <FaUsers className="text-gray-600" /> Group Information
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem className="text-xs gap-2 cursor-pointer font-medium">
            <GiBroom className="text-gray-600" /> Clear Chat
          </DropdownMenuItem>

          <DropdownMenuItem className="text-xs gap-2 cursor-pointer font-medium">
            <ImExit className="text-gray-600" /> Leave Group
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GroupOptionsDropDownMenu;
