"use client";
import SelectGroupAdmins from "@/components/SelectGroupAdmins/SelectGroupAdmins";
import SelectGroupMembers from "@/components/SelectGroupMembers/SelectGroupMembers";
import Image from "next/image";
import React, { JSX, useState } from "react";
import { FaCamera } from "react-icons/fa";

const CreateGroup = (): JSX.Element => {
  const [adminsToBe, setAdminsToBe] = useState<Follower[]>([]);

  return (
    <div className="p-3">
      <div className="flex items-center justify-center mt-8">
        <h1 className="text-3xl font-semibold">Create Group</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 container m-auto justify-evenly mt-14 gap-8 items-center">
        <div className="flex h-full flex-1 items-center justify-center">
          <div className="relative rounded-full flex h-[200px] md:h-[300px] w-[200px] md:w-[300px]">
            <Image
              className="h-full w-full"
              src={"/images/default-group-icon.png"}
              alt="group icon"
              height={300}
              width={300}
            />
            <label
              htmlFor="group-icon"
              className="absolute rounded-full flex items-center justify-center bottom-5 right-5 bg-[var(--secondary)] border-4 border-white w-14 h-14 text-white z-10"
            >
              <FaCamera className="text-2xl" />
            </label>
            <input className="hidden" type="file" name="" id="group-icon" />
          </div>
        </div>

        <div className="flex flex-col flex-1 w-full gap-4">
          <div className="flex gap-1 flex-col">
            <label htmlFor="">Group Name</label>
            <input
              type="text"
              name=""
              className="border-2 p-2 rounded-lg"
              placeholder="Group Name"
              id=""
            />
          </div>
          <div className="flex gap-1 flex-col">
            <label htmlFor="">Group Description</label>
            <textarea
              name=""
              className="border-2 p-2 resize-none rounded-lg h-20"
              placeholder="Group Description"
              id=""
            />
          </div>
        </div>
      </div>

      <SelectGroupMembers
        adminsToBe={adminsToBe}
        setAdminsToBe={setAdminsToBe}
      />

      <SelectGroupAdmins adminsToBe={adminsToBe} />

      <div className="flex container justify-end my-8 m-auto w-full">
        <button className="bg-[var(--secondary)] text-white p-2 rounded-lg font-semibold">
          Create Group
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;
