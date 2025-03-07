import { selectUser } from "@/features/user/userSlice";
import Image from "next/image";
import React, { JSX } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const AddStory = (): JSX.Element => {
  const user: User | null = useSelector(selectUser);

  return (
    <div className="flex h-16 w-16 rounded-full relative cursor-pointer">
      <Image
        src={user?.profilePicture || "/images/default-profile.jpg"}
        alt="avatar"
        height={40}
        width={40}
        className="h-full w-full rounded-full object-cover"
      />

      <div className="flex absolute right-0 bottom-0 bg-green-500 rounded-full p-1">
        <FaPlus className="text-xs text-white" />
      </div>
    </div>
  );
};

export default AddStory;
