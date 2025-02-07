import Image from "next/image";
import React, { JSX } from "react";
import { FaPlus } from "react-icons/fa";

const AddStory = (): JSX.Element => {
  return (
    <div className="flex h-16 w-16 rounded-full relative cursor-pointer">
      <Image
        src={
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
        }
        alt="avatar"
        height={40}
        width={40}
        className="h-full w-full rounded-full object-cover"
      />

      <div className="flex absolute right-0 bottom-0 bg-green-500 rounded-full p-1">
        <FaPlus className="text-xs text-white" />
      </div>
    </div>
  );
};

export default AddStory;
