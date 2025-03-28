"use client";
import BlockedUserItem from "@/components/BlockedUserItem/BlockedUserItem";
import Spinner from "@/components/Spinner/Spinner";
import { Separator } from "@/components/ui/separator";
import { useGetBlockedUsersQuery } from "@/features/api/blockUserApi";
import React, { JSX, useState } from "react";

const BlockedUsers = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, error, isLoading } = useGetBlockedUsersQuery();

  const filteredUsers = data?.blockedUsers?.filter((user: Follower) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function renderContent(): JSX.Element {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <Spinner variant={"small"} />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-gray-500 py-6">
          Failed to load blocked users. Please try again later.
        </div>
      );
    }

    if (!filteredUsers || filteredUsers.length === 0) {
      return (
        <div className="text-center text-gray-500 py-6">
          No blocked users found.
        </div>
      );
    }

    return (
      <div className="flex">
        {filteredUsers.map((user: Follower) => (
          <BlockedUserItem key={user._id} user={user} />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto pb-6 bg-white space-y-6">
      <div>
        <h3 className="text-lg font-medium">Blocked Users</h3>
        <p className="text-sm text-muted-foreground">
          Blocked users won&apos;t be able to interact with you until you
          unblock them.
        </p>
      </div>
      <Separator />

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search blocked users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 px-4 rounded-md border border-gray-300 outline-[var(--secondary)]"
        />
      </div>

      {renderContent()}
    </div>
  );
};

export default BlockedUsers;
