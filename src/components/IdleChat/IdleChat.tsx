import Image from "next/image";
import React, { JSX } from "react";

const IdleChat = (): JSX.Element => {
  return (
    <div className="hidden md:flex flex-col flex-1 h-full items-center justify-center">
      <Image
        src={"/images/idle-chat.jpg"}
        alt="idle"
        height={300}
        width={300}
        className="h-[80%] w-[80%] max-h-[400px] max-w-[400px]"
      />
    </div>
  );
};

export default IdleChat;
