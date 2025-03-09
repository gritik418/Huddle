"use client";
import { selectFollowers } from "@/features/user/userSlice";
import Image from "next/image";
import { JSX, useState } from "react";
import { useSelector } from "react-redux";

const Followers = () => {
  const followers: Follower[] = useSelector(selectFollowers);
  const [searchQuery, setSearchQuery] = useState("");

  function renderComponent(): JSX.Element {
    if (!followers || followers.length === 0) {
      return (
        <div className="flex justify-center p-4">
          <p>No followers.</p>
        </div>
      );
    }

    const filteredFollowers = followers?.filter((follower: Follower) => {
      const query = `${follower.firstName}${follower?.lastName || ""}${
        follower.username
      }`;
      return query.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (!filteredFollowers || filteredFollowers.length === 0) {
      return (
        <div className="flex justify-center p-4">
          <p>No followers found for your search.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {filteredFollowers.map((follower) => (
          <div
            key={follower._id}
            className="flex items-center justify-between p-4 shadow-sm bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-white mr-4">
                <Image
                  src={follower.profilePicture || "/images/default-profile.jpg"}
                  alt="avatar"
                  className="rounded-full h-full w-full"
                  height={60}
                  width={60}
                />
              </div>
              <div>
                <p className="font-semibold">{follower.firstName}</p>
                <p className="text-sm text-gray-500">@{follower.username}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white mt-8 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Followers</h1>

      <div className="mb-6">
        <input
          type="text"
          className="w-full p-2 outline-none border-2 bg-gray-50 border-gray-400 rounded-lg"
          placeholder="Search followers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">{renderComponent()}</div>
    </div>
  );
};

export default Followers;
