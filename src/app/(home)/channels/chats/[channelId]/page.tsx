"use client";
import { useSelector } from "react-redux";
import ChannelChatInfo from "../../../../../components/ChannelChatInfo/ChannelChatInfo";
import ChannelChatInput from "../../../../../components/ChannelChatInput/ChannelChatInput";
import ChannelMessagePlayground from "../../../../../components/ChannelMessagePlayground/ChannelMessagePlayground";
import { selectUser } from "../../../../../features/user/userSlice";
import NotLoggedIn from "../../../../../components/NotLoggedIn/NotLoggedIn";
import { JSX } from "react";
import { redirect, useParams } from "next/navigation";
import {
  useGetChannelByIdQuery,
  useGetChannelChatMessagesQuery,
  useGetChannelChatsQuery,
} from "../../../../../features/api/channelApi";
import Spinner from "../../../../../components/Spinner/Spinner";
import Image from "next/image";
import ChannelChats from "../../../../../components/ChannelChats/ChannelChats";

const ChannelChat = () => {
  const params: { channelId: string } = useParams();
  const user: User | null = useSelector(selectUser);

  const { data, isError, isLoading } = useGetChannelByIdQuery(params.channelId);

  useGetChannelChatMessagesQuery(params.channelId, {
    refetchOnMountOrArgChange: true,
  });

  const {
    isError: chatsError,
    isLoading: chatsLoading,
    data: chatsData,
  } = useGetChannelChatsQuery();

  if (isLoading || chatsLoading) {
    return (
      <div className="flex bg-gray-50 min-h-[calc(100vh-56px-16px-24px)] h-full rounded-lg w-full items-center justify-center">
        <Spinner variant={"medium"} />
      </div>
    );
  }

  if (!user || !user._id) return <NotLoggedIn />;

  if (isError || chatsError) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-56px-16px-24px)] bg-gray-50 h-full rounded-lg w-full items-center justify-center">
        <p>Something went wrong while fetching the channel.</p>{" "}
      </div>
    );
  }

  if (!data?.channel || !chatsData?.channels) {
    return (
      <div className="flex flex-col bg-white h-full min-h-[calc(100vh-56px-16px-24px)] rounded-lg w-full items-center justify-center">
        <Image
          src={"/images/no-chat.jpg"}
          alt="no-chat"
          height={300}
          width={300}
        />
        <p className="text-xl text-center">
          Oops! This chat doesn&apos;t exist or has been removed.
        </p>
      </div>
    );
  }

  const memberIds = data.channel.members.map((member: Follower) => member._id);

  function renderInputComponent(): JSX.Element {
    if (!user) redirect("/login");
    if (data?.channel?.sendMessagePermission === "creator") {
      if (data?.channel?.creatorId._id === user?._id)
        return <ChannelChatInput channel={data.channel} />;
      return (
        <div className="flex rounded-lg p-6 bg-gray-200">
          <p>
            Only <span className="text-green-600">creator</span> can send
            messages.
          </p>
        </div>
      );
    }

    if (data?.channel?.sendMessagePermission === "members") {
      if (memberIds.includes(user._id.toString()))
        return <ChannelChatInput channel={data.channel} />;

      return (
        <div className="flex rounded-lg p-6 bg-gray-200">
          <p>
            Only <span className="text-green-600">members</span> can send
            messages.
          </p>
        </div>
      );
    }

    if (data?.channel?.sendMessagePermission === "everyone") {
      if (data?.channel?.creatorId._id === user?._id)
        return <ChannelChatInput channel={data.channel} />;

      if (memberIds.includes(user._id.toString()))
        return <ChannelChatInput channel={data.channel} />;

      return (
        <div className="flex rounded-lg p-6 bg-gray-200">
          <p>
            Only <span className="text-green-600">members or creator</span> can
            send messages.
          </p>
        </div>
      );
    }

    return (
      <div className="flex rounded-lg p-6 bg-gray-200">
        <p>
          Only <span className="text-green-600">members</span> can send
          messages.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-56px-16px-24px)] gap-2 h-[calc(100vh-56px-16px-24px)] bg-white p-2 flex rounded-lg">
      <div className="min-w-[280px] items-center h-full overflow-y-scroll hide-scrollbar">
        <ChannelChats channels={chatsData?.channels} />
      </div>

      <div className="flex flex-1 h-full items-center justify-center w-full">
        <div className="flex flex-col w-full h-full bg-gray-50">
          <ChannelChatInfo channel={data?.channel} />

          <ChannelMessagePlayground />

          {renderInputComponent()}
        </div>
      </div>
    </div>
  );
};

export default ChannelChat;
