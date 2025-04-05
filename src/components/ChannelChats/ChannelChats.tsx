"use client";
import Spinner from "../../components/Spinner/Spinner";
import { JSX } from "react";
import { useGetChannelChatsQuery } from "../../features/api/channelApi";
import ChannelChatItem from "../ChannelChatItem/ChannelChatItem";

const ChannelChats = (): JSX.Element => {
  const { isError, isLoading, data } = useGetChannelChatsQuery();

  if (isLoading) {
    return (
      <div className="flex h-full bg-white justify-center py-8 items-center w-full">
        <Spinner variant={"small"} />
      </div>
    );
  }

  if (isError || !data || !data.channels || !data.channels.length) {
    return (
      <div className="flex bg-white w-full h-full items-center justify-center">
        <p className="text-lg">You haven't joined any channels yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 overflow-scroll hide-scrollbar">
      {data.channels.map((channel: Channel) => (
        <ChannelChatItem key={channel._id} channel={channel} />
      ))}
    </div>
  );
};

export default ChannelChats;
