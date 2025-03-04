import { GoBookmark } from "react-icons/go";
import { HiDotsVertical } from "react-icons/hi";
import { MdBlock } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const PostOptions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer">
          <HiDotsVertical className="text-xl" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <GoBookmark /> Save Post
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MdBlock /> Block User
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostOptions;
