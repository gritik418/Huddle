import { JSX } from "react";
import Image from "next/image";

const ChannelChatsPage = (): JSX.Element => {
  return (
    <div className="flex flex-1 h-full items-center justify-center w-full">
      <Image
        src={"/images/select-channel-chat.jpg"}
        alt="img"
        height={280}
        width={280}
      />
    </div>
  );
};

export default ChannelChatsPage;
