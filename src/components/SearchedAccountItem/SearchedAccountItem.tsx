import Image from "next/image";
import Link from "next/link";
import React, { JSX } from "react";

type PropsType = {
  user: {
    _id: string;
    firstName: string;
    lastName?: string;
    username: string;
    profilePicture?: string;
  };
};

const SearchedAccountItem = ({ user }: PropsType): JSX.Element => {
  return (
    <Link
      href={`/user/${user.username}`}
      className="flex bg-gray-100 p-2 gap-2 items-center rounded-lg"
    >
      <div className="flex h-16 w-1h-16 rounded-full">
        <Image
          src={user?.profilePicture || "/images/default-profile.jpg"}
          alt="avatar"
          height={70}
          width={70}
          className="h-full w-full rounded-full"
        />
      </div>

      <div className="flex flex-col">
        <p>
          {user.firstName} {user?.lastName}
        </p>

        <p className="text-sm text-gray-500 font-medium">{user.username}</p>
      </div>
    </Link>
  );
};

export default SearchedAccountItem;
