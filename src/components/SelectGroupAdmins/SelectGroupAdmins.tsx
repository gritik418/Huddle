"use client";
import Image from "next/image";
import { JSX } from "react";
import SelectAdminTile from "../SelectAdminTile/SelectAdminTile";

type PropsType = {
  adminsToBe: Follower[];
  selectedAdmins: string[];
  setSelectedAdmins: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelectGroupAdmins = ({
  adminsToBe,
  selectedAdmins,
  setSelectedAdmins,
}: PropsType): JSX.Element => {
  return (
    <div className="flex flex-col container m-auto mt-12">
      <p className="text-2xl">Select Group Admins</p>

      <div className="grid grid-cols-1 py-3 gap-3">
        <div className="flex bg-green-100 px-4 items-center justify-start gap-2 rounded-lg p-2">
          <div className="flex">
            <Image
              className="rounded-full"
              src={"/images/default-profile.jpg"}
              alt="avatar"
              height={50}
              width={50}
            />
          </div>

          <div className="flex flex-col p-1 gap-0 tracking-tighter">
            <p className="font-semibold">Ritik Gupta</p>
            <p className="text-sm text-gray-500 font-semibold">@ritik_</p>
          </div>
        </div>

        {adminsToBe.map((admin: Follower) => (
          <SelectAdminTile
            key={admin._id}
            user={admin}
            selectedAdmins={selectedAdmins}
            setSelectedAdmins={setSelectedAdmins}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectGroupAdmins;
