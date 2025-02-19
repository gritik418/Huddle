"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { selectFollowings } from "@/features/user/userSlice";
import { JSX, useState } from "react";
import { VscMention } from "react-icons/vsc";
import { useSelector } from "react-redux";
import MentionItem from "../MentionItem/MentionItem";

const MentionsMenu = (): JSX.Element => {
  const followings: Follower[] = useSelector(selectFollowings);
  const [selectedMentions, setSelectedMentions] = useState<string[]>([]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer flex bg-gray-100 p-2 rounded-lg">
          <VscMention />
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
