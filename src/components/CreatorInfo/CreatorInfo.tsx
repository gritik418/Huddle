"use client";
import { selectUser } from "@/features/user/userSlice";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";

const CreatorInfo = () => {
  const user: User | null = useSelector(selectUser);

  if (!user) {
    return <NotLoggedIn />;
  }

  return (
    <div className="flex bg-gray-100 p-3 rounded-lg gap-3 items-start justify-between">
      <div className="flex gap-3 items-center">
        <div className="flex h-20 w-20 rounded-full gap-3">
          <Image
            className="h-full w-full rounded-full object-cover"
            src={user.profilePicture || "/images/default-profile.jpg"}
            alt="avatar"
            height={120}
            width={120}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xl font-normal">
            {user.firstName} {user?.lastName}
          </p>
          <p className="font-semibold text-gray-500">@{user.username}</p>
        </div>
      </div>

      <div className="flex">
        <Image src={"/images/badge.png"} alt="badge" height={25} width={25} />
      </div>
    </div>
  );
};

export default CreatorInfo;
