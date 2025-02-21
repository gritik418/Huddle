"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { selectFollowings } from "@/features/user/userSlice";
import { Dispatch, JSX, SetStateAction } from "react";
import { VscMention } from "react-icons/vsc";
import { useSelector } from "react-redux";
import MentionItem from "../MentionItem/MentionItem";

type PropsType = {
  selectedMentions: string[];
  setSelectedMentions: Dispatch<SetStateAction<string[]>>;
};

const MentionsMenu = ({
  selectedMentions,
  setSelectedMentions,
}: PropsType): JSX.Element => {
  const followings: Follower[] = useSelector(selectFollowings);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer relative flex bg-gray-100 p-2 rounded-lg">
          <VscMention />
          {selectedMentions.length > 0 && (
            <span className="absolute bg-blue-500 text-white -top-1 -right-1 h-4 w-4 rounded-full flex text-[10px] items-center justify-center">
              {selectedMentions.length}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[230px] max-w-[320px] gap-2 bg-white">
        <DropdownMenuLabel className="text-xs">Mention Users</DropdownMenuLabel>
        {followings.length === 0 ? (
          <div className="p-2 text-center text-gray-500 text-sm">
            No users to mention
          </div>
        ) : (
          followings.map((following: Follower) => (
            <MentionItem
              key={following._id}
              user={following}
              selectedMentions={selectedMentions}
              setSelectedMentions={setSelectedMentions}
            />
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MentionsMenu;
