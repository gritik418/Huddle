import Image from "next/image";
import React, { JSX } from "react";

const UserPulseItem = ({ pulse }: { pulse: Pulse }): JSX.Element => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className="flex items-center space-x-2">
        <Image
          src={pulse.userId.profilePicture || "/images/default-profile.jpg"}
          alt={"avatar"}
          height={50}
          width={50}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{pulse.userId.firstName}</p>
          <p className="text-gray-500 font-semibold text-sm">
            @{pulse.userId.username}
          </p>
        </div>
      </div>
      <p className="mt-4">{pulse.content}</p>
      <p className="text-gray-500 text-right text-xs">
        {new Date(pulse.createdAt).toDateString()}
      </p>
    </div>
  );
};

export default UserPulseItem;
