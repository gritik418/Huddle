import Image from "next/image";
import Link from "next/link";
import React, { JSX } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const FollowRequestItem = ({
  sender,
}: {
  sender: FollowRequestSender;
}): JSX.Element => {
  return (
    <div className="flex flex-col gap-1 hover:bg-gray-50 p-1 rounded-lg cursor-pointer">
      <div className="flex items-center gap-1">
        <Link
          href={`/user/${sender.username}`}
          className="flex h-12 w-12 rounded-full"
        >
          <Image
            src={sender?.profilePicture || "/images/default-profile.jpg"}
            alt="profile"
            height={50}
            width={50}
            className="h-12 w-12 rounded-full"
          />
        </Link>

        <div className="flex flex-col">
          <Link
            href={`/user/${sender.username}`}
            className="text-sm font-semibold"
          >
            {sender.firstName} {sender?.lastName}
          </Link>

          <p className="text-xs font-medium text-gray-500">
            @{sender.username}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mx-2 justify-end">
        <button className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-md text-red-400 bg-red-100">
          <MdDelete />
        </button>

        <button className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-md text-green-500 bg-green-200">
          <FaCheck />
        </button>
      </div>
    </div>
  );
};

export default FollowRequestItem;
