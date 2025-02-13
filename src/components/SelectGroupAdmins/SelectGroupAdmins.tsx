"use client";
import { JSX, useState } from "react";
import SelectAdminTile from "../SelectAdminTile/SelectAdminTile";
import Image from "next/image";

const SelectGroupAdmins = (): JSX.Element => {
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
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

        <SelectAdminTile
          selectedAdmins={selectedAdmins}
          setSelectedAdmins={setSelectedAdmins}
        />
      </div>
    </div>
  );
};

export default SelectGroupAdmins;
