import Image from "next/image";
import React, { Dispatch, JSX, SetStateAction } from "react";

type PropsType = {
  selectedAdmins: string[];
  setSelectedAdmins: Dispatch<SetStateAction<string[]>>;
};

const SelectAdminTile = ({
  selectedAdmins,
  setSelectedAdmins,
}: PropsType): JSX.Element => {
  const toggleSelectAdmin = (id: string): void => {
    if (!selectedAdmins.includes(id)) {
      setSelectedAdmins([...selectedAdmins, id]);
    } else {
      const admins: string[] = selectedAdmins.filter(
        (adminId: string) => adminId !== id
      );
      setSelectedAdmins(admins);
    }
  };

  return (
    <div
      onClick={() => toggleSelectAdmin("")}
      className={`flex cursor-pointer px-4 items-center gap-2 rounded-lg p-2 ${
        selectedAdmins.includes("") ? "bg-green-100" : "bg-gray-100 "
      }`}
    >
      <div className="flex">
        <Image
          className="rounded-full"
          src={"/images/default-profile.jpg"}
          alt="avatar"
          height={50}
          width={50}
        />
      </div>

      <div className="flex flex-col gap-0 tracking-tighter">
        <p className="font-semibold">Ritik Gupta</p>
        <p className="text-sm text-gray-500 font-semibold">@ritik_</p>
      </div>
    </div>
  );
};

export default SelectAdminTile;
