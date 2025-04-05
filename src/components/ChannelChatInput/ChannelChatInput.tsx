import { JSX } from "react";
import { IoSend } from "react-icons/io5";

const ChannelChatInput = (): JSX.Element => {
  return (
    <div className="bg-gray-200 gap-3 flex items-center justify-between p-2 rounded-xl">
      <div className="flex flex-1">
        <input
          type="text"
          placeholder="Type here..."
          className="text-xl flex-1 outline-none p-1 pl-3 bg-transparent"
        />
      </div>

      <div className="flex p-3 px-6 cursor-pointer items-center justify-center rounded-lg bg-[var(--secondary)] text-white">
        <IoSend className="text-2xl" />
      </div>
    </div>
  );
};

export default ChannelChatInput;
