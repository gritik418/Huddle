"use client";
import { selectFollowings } from "@/features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import { JSX, useState } from "react";
import { useSelector } from "react-redux";

const Followings = () => {
  const followings = useSelector(selectFollowings);
  const [searchQuery, setSearchQuery] = useState("");

  function renderComponent(): JSX.Element {
    if (!followings || followings.length === 0) {
      return (
        <div className="flex justify-center p-4">
          <p>No followings.</p>
        </div>
      );
    }

    const filteredFollowings = followings.filter((following) => {
      const query = `${following.firstName}${following?.lastName || ""}${
        following.username
      }`;
      return query.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (!filteredFollowings || filteredFollowings.length === 0) {
      return (
        <div className="flex justify-center p-4">
          <p>No followings found for your search.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {filteredFollowings.map((following) => (
          <Link
            href={`/user/${following.username}`}
            key={following._id}
            className="flex items-center justify-between p-4 shadow-sm bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-white mr-4">
                <Image
                  src={
                    following.profilePicture || "/images/default-profile.jpg"
                  }
                  alt="avatar"
                  className="rounded-full h-full w-full"
                  height={60}
                  width={60}
                />
              </div>
              <div>
                <p className="font-semibold">{following.firstName}</p>
                <p className="text-sm text-gray-500">@{following.username}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white mt-8 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Followings</h1>

      <div className="mb-6">
        <input
          type="text"
          className="w-full p-2 bg-gray-50 outline-none border-2 border-gray-400 rounded-lg"
          placeholder="Search followings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">{renderComponent()}</div>
    </div>
  );
};

export default Followings;
