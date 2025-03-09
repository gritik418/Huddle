import Image from "next/image";
import React from "react";

const GroupMemberTile = ({
  member,
  admins,
}: {
  member: ChatMember;
  admins: string[];
}) => {
  return (
    <div
      key={member._id}
      className="flex bg-gray-100 p-3 rounded-lg gap-3 justify-between items-center"
    >
      <div className="flex gap-3">
        <div className="flex h-12 w-12 rounded-full">
          <Image
            src={member.profilePicture || "/images/default-profile.jpg"}
            alt="avatar"
            className="rounded-full h-full w-full"
            height={50}
            width={50}
          />
        </div>

        <div className="flex flex-col">
          <p>
            {member.firstName} {member.lastName}
          </p>
          <p>{member.username}</p>
        </div>
      </div>

      {admins.includes(member._id) && (
        <span className="flex p-1 rounded-md text-xs bg-green-200 font-semibold text-green-700">
          Group Admin
        </span>
      )}
    </div>
  );
};

export default GroupMemberTile;
