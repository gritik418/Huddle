"use client";

import Image from "next/image";
import CreatorInfo from "../../../../components/CreatorInfo/CreatorInfo";
import Spinner from "../../../../components/Spinner/Spinner";
import { useGetChannelByIdQuery } from "../../../../features/api/channelApi";
import { useParams } from "next/navigation";
import React, { JSX } from "react";

const ChannelInfo = (): JSX.Element => {
  const params = useParams();
  const channelId = params?.channelId as string;

  const { data, isLoading, isError } = useGetChannelByIdQuery(channelId, {
    skip: !channelId,
  });

  if (isLoading) {
    return (
      <div className="flex bg-white w-full items-center justify-center p-6 rounded-lg min-h-[calc(100vh-56px-16px-24px)]">
        <Spinner variant={"medium"} />
      </div>
    );
  }

  if (isError || !data || !channelId || !data.channel) {
    return (
      <div className="flex flex-col bg-white w-full items-center justify-center p-6 rounded-lg min-h-[calc(100vh-56px-16px-24px)]">
        <Image
          src={"/images/no-chat.jpg"}
          alt="no-chat"
          height={300}
          width={300}
        />
        <p className="text-xl text-center">
          Oops! This channel doesn&apos;t exist or has been deleted.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg min-h-[calc(100vh-56px-16px-24px)] w-full gap-3 shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800">Channel Info</h1>

      <h2 className="text-lg font-semibold text-gray-700">
        {data?.channel?.name}
      </h2>

      <p className="text-gray-600">
        {data?.channel?.description || "No description available."}
      </p>
      <CreatorInfo user={data.channel.creatorId} />
    </div>
  );
};

export default ChannelInfo;
