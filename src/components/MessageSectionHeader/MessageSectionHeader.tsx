import Image from "next/image";
import React, { JSX } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const MessageSectionHeader = (): JSX.Element => {
  return (
    <div className="h-16 border-b-2 justify-between border-gray-100 flex items-center p-2 px-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full">
          <Image
            src={
              "https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
            }
            alt="proofile-image"
            className="h-10 w-10 rounded-full object-cover"
            height={40}
            width={40}
          />
        </div>

        <div className="flex flex-col py-1">
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs font-medium text-gray-400">Active</p>
        </div>
      </div>

      <div className="flex h-10 w-10 rounded-full bg-gray-100 items-center justify-center">
        <BsThreeDotsVertical />
      </div>
    </div>
  );
};

export default MessageSectionHeader;
