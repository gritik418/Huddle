"use client";
import { useParams } from "next/navigation";
import React from "react";

const ChannelInfo = () => {
  const params: { channelId: string } = useParams();
  return (
    <div className="flex flex-col bg-white p-6 rounded-lg min-h-[calc(100vh-56px-16px-24px)] w-full gap-3">
      ChannelInfo {params.channelId}
    </div>
  );
};

export default ChannelInfo;
