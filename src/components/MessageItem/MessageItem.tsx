import Image from "next/image";
import React, { JSX } from "react";

type PropsType = { isSent: boolean; message: Message };

const MessageItem = ({ isSent, message }: PropsType): JSX.Element => {
  return isSent ? (
    <div className="bg-[var(--secondary)] w-max ml-auto max-w-[85%] p-2 my-2 px-4 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl">
      <p className="text-white w-max text-xs font-medium text-wrap">
        {message.content}
      </p>
    </div>
  ) : (
    <div className="flex my-2 items-start gap-1">
      <Image
        src={
          "https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
        }
        className="h-5 w-5 rounded-full"
        alt="profile-image"
        height={20}
        width={20}
      />
      <div className="bg-white p-2 px-4 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl">
        <p className="text-gray-600 text-xs w-max font-medium">
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
