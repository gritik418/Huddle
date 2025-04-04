import ChannelChatInfo from "../../../../../components/ChannelChatInfo/ChannelChatInfo";
import ChannelChatInput from "../../../../../components/ChannelChatInput/ChannelChatInput";
import ChannelMessagePlayground from "../../../../../components/ChannelMessagePlayground/ChannelMessagePlayground";
import React from "react";

const ChannelChat = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <ChannelChatInfo />

      <ChannelMessagePlayground />

      <ChannelChatInput />
    </div>
  );
};

export default ChannelChat;
