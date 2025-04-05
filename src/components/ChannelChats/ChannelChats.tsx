"use client";
import { JSX } from "react";
import ChannelChatItem from "../ChannelChatItem/ChannelChatItem";

const ChannelChats = ({ channels }: { channels: Channel[] }): JSX.Element => {
  return (
    <div className="flex flex-col gap-2 overflow-scroll hide-scrollbar">
      {channels.map((channel: Channel) => (
        <ChannelChatItem key={channel._id} channel={channel} />
      ))}
    </div>
  );
};

export default ChannelChats;
