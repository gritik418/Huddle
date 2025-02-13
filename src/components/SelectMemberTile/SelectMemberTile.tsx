import Image from "next/image";
import React, { JSX } from "react";

const SelectMemberTile = (): JSX.Element => {
  return (
    <div className="flex px-4 items-center justify-between gap-2 rounded-lg bg-gray-100 p-2">
      <div className="flex">
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

      <input type="checkbox" className="h-6 w-6" />
    </div>
  );
};

export default SelectMemberTile;
