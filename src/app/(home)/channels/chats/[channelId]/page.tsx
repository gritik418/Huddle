"use client";
import { useSelector } from "react-redux";
import ChannelChatInfo from "../../../../../components/ChannelChatInfo/ChannelChatInfo";
import ChannelChatInput from "../../../../../components/ChannelChatInput/ChannelChatInput";
import ChannelMessagePlayground from "../../../../../components/ChannelMessagePlayground/ChannelMessagePlayground";
import { selectUser } from "../../../../../features/user/userSlice";
import NotLoggedIn from "../../../../../components/NotLoggedIn/NotLoggedIn";
import { JSX } from "react";
import { useParams } from "next/navigation";
import {
  useGetChannelByIdQuery,
  useGetChannelChatMessagesQuery,
} from "../../../../../features/api/channelApi";
import Spinner from "../../../../../components/Spinner/Spinner";
import Image from "next/image";

const ChannelChat = () => {
  const params: { channelId: string } = useParams();
  const user: User | null = useSelector(selectUser);

  const { data, isError, isLoading } = useGetChannelByIdQuery(params.channelId);
  useGetChannelChatMessagesQuery(params.channelId, {
    refetchOnMountOrArgChange: true,
  });

  if (!user || !user._id) return <NotLoggedIn />;

  if (isLoading) {
    return (
      <div className="flex bg-gray-50 h-full rounded-lg w-full items-center justify-center">
        <Spinner variant={"medium"} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col bg-gray-50 h-full rounded-lg w-full items-center justify-center">
        <p>Something went wrong while fetching the channel.</p>{" "}
      </div>
    );
  }

  if (!data?.channel) {
    return (
      <div className="flex flex-col h-full rounded-lg w-full items-center justify-center">
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
      if (memberIds.includes(user?._id.toString()!))
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

      if (memberIds.includes(user?._id.toString()!))
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
    <div className="flex flex-col w-full h-full bg-gray-50">
      <ChannelChatInfo channel={data?.channel} />

      <ChannelMessagePlayground channelId={data.channel._id} />

      {renderInputComponent()}
    </div>
  );
};

export default ChannelChat;
