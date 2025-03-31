import Image from "next/image";
import { JSX } from "react";

const CreatorInfo = ({ user }: { user: Follower }): JSX.Element => {
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

        <div className="flex flex-col items-start">
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
