import Image from "next/image";
import { JSX } from "react";

const InviteMemberItem = ({ member }: { member: Follower }): JSX.Element => {
  return (
    <div className="bg-white flex justify-between items-center rounded-lg p-2">
      <div className="flex items-center gap-2">
        <div className="flex h-16 w-16 rounded-full">
          <Image
            src={member.profilePicture || "/images/default-profile.jpg"}
            alt="avatar"
            height={60}
            className="h-full w-full rounded-full"
            width={60}
          />
        </div>

        <div className="flex flex-col">
          <p>
            {member.firstName} {member.lastName}
          </p>
          <p>@{member.username}</p>
        </div>
      </div>

      <div className="flex bg-[var(--secondary)] p-1 px-2 rounded-md font-medium cursor-pointer hover:bg-[var(--primary)] transition-colors ease-in-out duration-300 text-white">
        Invite
      </div>
    </div>
  );
};

export default InviteMemberItem;
