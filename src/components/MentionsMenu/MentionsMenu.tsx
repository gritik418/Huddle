"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetUsersForMentionQuery } from "@/features/api/userApi";
import { Dispatch, JSX, SetStateAction } from "react";
import { VscMention } from "react-icons/vsc";
import MentionItem from "../MentionItem/MentionItem";
import Spinner from "../Spinner/Spinner";

type PropsType = {
  selectedMentions: string[];
  setSelectedMentions: Dispatch<SetStateAction<string[]>>;
};

const MentionsMenu = ({
  selectedMentions,
  setSelectedMentions,
}: PropsType): JSX.Element => {
  const { isLoading, data, error } = useGetUsersForMentionQuery();

  function renderContent(): JSX.Element {
    if (isLoading) {
      return (
        <div className="flex py-6 items-center justify-center">
          <Spinner variant={"xs"} />
        </div>
      );
    }

    if (error || !data?.users || data.users.length === 0) {
      return (
        <div className="p-2 py-6 text-center text-gray-500 text-sm">
          <p>No users to mention</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full gap-1">
        {data.users.map((following: Follower) => (
          <MentionItem
            key={following._id}
            user={following}
            selectedMentions={selectedMentions}
            setSelectedMentions={setSelectedMentions}
          />
        ))}
      </div>
    );
  }

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
        {renderContent()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MentionsMenu;
