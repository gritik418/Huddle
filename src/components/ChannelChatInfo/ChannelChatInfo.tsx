import Image from "next/image";
import React, { JSX } from "react";

const ChannelChatInfo = ({ channel }: { channel: Channel }): JSX.Element => {
  return (
    <div className="bg-gray-200 p-3 flex items-center gap-2 rounded-lg">
      <div className="flex h-12 w-12 rounded-full">
        <Image
          src={"/images/default-profile.jpg"}
          alt="icon"
          height={60}
          width={60}
          className="h-full w-full rounded-full"
        />
      </div>

      <div className="flex">
        <p>{channel.name}</p>
      </div>
    </div>
  );
};

export default ChannelChatInfo;
