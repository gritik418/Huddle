import Image from "next/image";
import React, { ChangeEvent, Dispatch, JSX, SetStateAction } from "react";

type PropsType = {
  setAdminsToBe: React.Dispatch<React.SetStateAction<Follower[]>>;
  adminsToBe: Follower[];
  member: Follower;
  selectedMembers: string[];
  setSelectedMembers: Dispatch<SetStateAction<string[]>>;
};

const SelectMemberTile = ({
  member,
  adminsToBe,
  setAdminsToBe,
  selectedMembers,
  setSelectedMembers,
}: PropsType): JSX.Element => {
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked: boolean = e.target.checked;
    const existingMember = adminsToBe.some((admin) => admin._id === member._id);

    if (isChecked && !existingMember) {
      const alreadyAdded: boolean = selectedMembers.includes(member._id);
      if (!alreadyAdded) {
        setSelectedMembers(() => [...selectedMembers, member._id]);
      }
      setAdminsToBe((prevAdmins) => [...prevAdmins, member]);
    } else if (!isChecked && existingMember) {
      setAdminsToBe((prevAdmins) =>
        prevAdmins.filter((admin) => admin._id !== member._id)
      );
      setSelectedMembers((prevMember) =>
        prevMember.filter((id: string) => id !== member._id)
      );
    }
  };

  return (
    <div className="flex px-4 items-center justify-between gap-2 rounded-lg bg-gray-100 p-2">
      <div className="flex">
        <div className="flex">
          <Image
            className="rounded-full"
            src={member?.profilePicture || "/images/default-profile.jpg"}
            alt="avatar"
            height={50}
            width={50}
          />
        </div>

        <div className="flex flex-col p-1 gap-0 tracking-tighter">
          <p className="font-semibold">
            {member.firstName} {member?.lastName}
          </p>
          <p className="text-sm text-gray-500 font-semibold">
            @{member.username}
          </p>
        </div>
      </div>

      <input
        type="checkbox"
        onChange={handleSelect}
        className="h-6 w-6 bg-gray-50"
      />
    </div>
  );
};

export default SelectMemberTile;
