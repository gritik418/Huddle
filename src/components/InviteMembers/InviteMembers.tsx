"use client";
import { JSX, useState } from "react";
import InviteMemberItem from "../InviteMemberItem/InviteMemberItem";
import { useGetFollowingsQuery } from "@/features/api/userApi";
import Spinner from "../Spinner/Spinner";

const InviteMembers = ({
  memberIds,
  channelId,
}: {
  memberIds: string[];
  channelId: string;
}): JSX.Element => {
  const { isError, isLoading, data } = useGetFollowingsQuery();
  const [searchTerm, setSearchTerm] = useState<string>("");

  function renderContent(): JSX.Element {
    if (isLoading)
      return (
        <div className="flex items-center justify-center py-8">
          <Spinner variant={"medium"} />
        </div>
      );

    if (isError || !data || !data.following || data.following.length === 0) {
      return (
        <div className="flex py-8 text-center w-full items-center justify-center">
          <p>No users to invite.</p>
        </div>
      );
    }

    const filteredMembers = data.following
      .filter((member: Follower) => !memberIds.includes(member._id))
      .filter((member: Follower) => {
        if (searchTerm.trim().length > 0) {
          const memberQuery = `${member.firstName}${member?.lastName}${member.username}`;
          return memberQuery.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
          return true;
        }
      });

    if (!filteredMembers || filteredMembers.length === 0) {
      return (
        <div className="flex py-8 text-center w-full items-center justify-center">
          <p>No users to invite.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {filteredMembers.map((member: Follower) => {
          if (memberIds.includes(member._id)) return null;
          return (
            <InviteMemberItem
              key={member._id}
              channelId={channelId}
              member={member}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-3 flex flex-col rounded-lg">
      <p className="mb-4 text-xl">Invite Members</p>

      <div className="flex border mb-6 bg-white rounded-md">
        <input
          type="text"
          className="w-full p-4 bg-gray-50 outline-[var(--secondary)] rounded-md"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {renderContent()}
    </div>
  );
};

export default InviteMembers;
