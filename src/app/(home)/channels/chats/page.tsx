"use client";
import { JSX } from "react";
import Image from "next/image";
import ChannelChats from "../../../../components/ChannelChats/ChannelChats";
import { useGetChannelChatsQuery } from "../../../../features/api/channelApi";
import Spinner from "../../../../components/Spinner/Spinner";

const ChannelChatsPage = (): JSX.Element => {
  const { isError, isLoading, data } = useGetChannelChatsQuery();

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[calc(100vh-56px-16px-24px)] bg-white justify-center py-8 items-center w-full">
        <Spinner variant={"small"} />
      </div>
    );
  }

  if (isError || !data || !data.channels || !data.channels.length) {
    return (
      <div className="flex min-h-[calc(100vh-56px-16px-24px)] bg-white w-full h-full items-center justify-center">
        <p className="text-lg">You haven't joined any channels yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-56px-16px-24px)] gap-2 h-[calc(100vh-56px-16px-24px)] bg-white p-2 flex rounded-lg">
      <div className="min-w-[280px] items-center h-full overflow-y-scroll hide-scrollbar">
        <ChannelChats channels={data.channels} />
      </div>

      <div className="flex flex-1 h-full items-center justify-center w-full">
        <div className="flex flex-1 h-full items-center justify-center w-full">
          <Image
            src={"/images/select-channel-chat.jpg"}
            alt="img"
            height={280}
            width={280}
          />
        </div>
      </div>
    </div>
  );
};

export default ChannelChatsPage;
