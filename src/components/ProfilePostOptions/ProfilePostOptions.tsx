import { HiDotsVertical } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MdCommentsDisabled } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const ProfilePostOptions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer">
          <HiDotsVertical className="text-xl" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <FaRegTrashAlt className="text-xs" /> Remove Post
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <MdCommentsDisabled className="text-xs" /> Disable Comments
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfilePostOptions;
