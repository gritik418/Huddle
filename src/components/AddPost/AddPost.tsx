import Image from "next/image";
import React from "react";
import { VscMention } from "react-icons/vsc";
import { GrAttachment } from "react-icons/gr";
import MentionsMenu from "../MentionsMenu/MentionsMenu";

const AddPost = () => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex gap-2">
        <div className="h-10 w-10 rounded-full">
          <Image
            src={
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt="avatar"
            height={40}
            width={40}
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <textarea
            className="bg-gray-100 flex-1 min-h-24 resize-none p-2 px-4 outline-none rounded-lg placeholder:font-semibold"
            placeholder="What's happening?"
          />

          <div className="flex mt-2 justify-between items-center">
            <div className="flex gap-3">
              <MentionsMenu />

              <div className="flex bg-gray-100 p-2 rounded-lg">
                <GrAttachment />
              </div>
            </div>

            <div className="flex">
              <button className="p-1 px-6 bg-[var(--secondary)] text-lg font-bold rounded-lg text-white">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
