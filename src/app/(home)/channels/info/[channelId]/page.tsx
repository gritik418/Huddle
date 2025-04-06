"use client";

import NotLoggedIn from "../../../../../components/NotLoggedIn/NotLoggedIn";
import {
  JoinRequestApiResponse,
  useGetJoinRequestsQuery,
  useSendJoinRequestMutation,
} from "../../../../../features/api/joinRequestApi";
import { Input, Menu, Portal, Textarea } from "@chakra-ui/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { JSX, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoPersonRemove } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
import CreatorInfo from "../../../../../components/CreatorInfo/CreatorInfo";
import Spinner from "../../../../../components/Spinner/Spinner";
import { useGetChannelByIdQuery } from "../../../../../features/api/channelApi";
import { selectUser } from "../../../../../features/user/userSlice";
import JoinRequestItem from "../../../../../components/JoinRequestItem/JoinRequestItem";

const ChannelInfo = (): JSX.Element => {
  const params = useParams();
  const channelId = params?.channelId as string;
  const user: User | null = useSelector(selectUser);
  const [sendJoinRequest] = useSendJoinRequestMutation();
  const [joinRequestLoading, setJoinRequestLoading] = useState<boolean>(false);

  const { data, isLoading, isError, refetch } = useGetChannelByIdQuery(
    channelId,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const {
    data: requestData,
    isLoading: requestLoading,
    isError: joinRequestError,
    refetch: refetchJoinRequest,
  } = useGetJoinRequestsQuery(channelId);

  if (!user || !user._id) return <NotLoggedIn />;

  if (isLoading || requestLoading) {
    return (
      <div className="flex bg-white w-full items-center justify-center p-6 rounded-lg min-h-[calc(100vh-56px-16px-24px)]">
        <Spinner variant={"medium"} />
      </div>
    );
  }

  if (
    isError ||
    !data ||
    !channelId ||
    !data.channel ||
    !data.channel._id ||
    joinRequestError
  ) {
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

  const memberIds: string[] = data.channel.members.map((member: Follower) =>
    member._id.toString()
  );

  const handleSendJoinRequest = async (): Promise<void> => {
    try {
      setJoinRequestLoading(true);
      const { data, error } = await sendJoinRequest(channelId);
      await refetch();
      setJoinRequestLoading(false);
      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as JoinRequestApiResponse;

        toast.error(parsedError.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else if (data) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error(error);
      toast.success("Something went wrong.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg min-h-[calc(100vh-56px-16px-24px)] w-full gap-3 shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 text-center">
        Channel Information
      </h1>

      <div className="flex flex-col gap-1 mt-6">
        <label className="text-sm text-gray-600 font-medium">
          Channel Name
        </label>
        <Input
          type="text"
          value={data.channel.name}
          readOnly
          className="border-2 p-2 bg-gray-50 outline-none"
        />
      </div>

      <div className="flex flex-col gap-1 mt-3">
        <label className="text-sm text-gray-600 font-medium">
          Channel Description
        </label>
        <Textarea
          height={"140px"}
          value={data.channel.description}
          readOnly
          className="border-2 p-2 bg-gray-50 resize-none outline-none"
        />
      </div>

      {!memberIds.includes(user?._id) &&
        data.channel.creatorId._id !== user._id &&
        data.channel.type !== "invite-only" && (
          <button
            onClick={handleSendJoinRequest}
            className="self-center mt-2 h-10 w-28 flex items-center justify-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
          >
            {joinRequestLoading ? <Spinner variant={null} /> : "Join Channel"}
          </button>
        )}

      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Creator</h2>
        <CreatorInfo user={data.channel.creatorId} />
      </div>

      <div className="mt-6 flex w-full flex-col">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Members{" "}
          <span className="text-xs">
            ({data.channel.members.length}{" "}
            {data.channel.members.length > 1 ? "members" : "member"})
          </span>
        </h2>

        {data.channel.members?.length > 0 ? (
          <div className="flex w-full flex-col gap-4">
            {data.channel.members.map((member: Follower) => (
              <div
                key={member._id}
                className="p-4 w-full flex justify-between items-center rounded-xl bg-gray-50 border hover:shadow-md transition"
              >
                <div className="flex items-center rounded-full gap-3">
                  <div className="flex h-12 w-12 rounded-full">
                    <Image
                      src={
                        member.profilePicture || "/images/default-profile.jpg"
                      }
                      alt={member.username}
                      width={40}
                      height={40}
                      className="rounded-full object-cover h-full w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-500">
                      {member.firstName} {member?.lastName}
                    </p>
                    <p className="text-gray-500 font-medium">
                      {member.username}
                    </p>
                  </div>
                </div>

                {user?._id === data?.channel?.creatorId._id &&
                  member._id !== user?._id && (
                    <Menu.Root>
                      <Menu.Trigger asChild>
                        <div className="flex cursor-pointer p-1">
                          <BsThreeDotsVertical />
                        </div>
                      </Menu.Trigger>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content>
                            <Menu.Item
                              value="new-txt-a"
                              className="cursor-pointer"
                            >
                              Remove Member
                              <Menu.ItemCommand>
                                <IoPersonRemove />
                              </Menu.ItemCommand>
                            </Menu.Item>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No members found in this channel.
          </p>
        )}
      </div>

      {user?._id === data.channel.creatorId._id &&
        requestData &&
        requestData.joinRequests &&
        data.channel.type == "private" && (
          <div className="mt-6 flex w-full flex-col">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Join Requests{" "}
              <span className="text-xs">
                ({requestData?.joinRequests?.length || 0}{" "}
                {requestData.joinRequests?.length === 1
                  ? "request"
                  : "requests"}
                )
              </span>
            </h2>

            {requestData.joinRequests?.length > 0 ? (
              <div className="flex w-full flex-col gap-4">
                {requestData.joinRequests.map((request: JoinRequest) => (
                  <JoinRequestItem
                    key={request._id}
                    request={request}
                    refetchJoinRequest={refetchJoinRequest}
                    refetch={refetch}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No join requests at the moment.
              </p>
            )}
          </div>
        )}
    </div>
  );
};

export default ChannelInfo;
