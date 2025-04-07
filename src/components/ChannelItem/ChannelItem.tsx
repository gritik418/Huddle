"use client";
import { selectUser } from "../../features/user/userSlice";
import Link from "next/link";
import { JSX, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";
import { Bounce, toast } from "react-toastify";
import {
  JoinRequestApiResponse,
  useSendJoinRequestMutation,
} from "../../features/api/joinRequestApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Spinner from "../Spinner/Spinner";
import { Menu, Portal } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import {
  DeleteChannelApiResponse,
  useDeleteChannelMutation,
} from "../../features/api/channelApi";
import { AppDispatch } from "../../app/store";
import { deleteChannelById } from "../../features/channel/channelSlice";
import { filterSearchedChannelById } from "../../features/search/searchSlice";

const ChannelItem = ({ channel }: { channel: Channel }): JSX.Element => {
  const user = useSelector(selectUser);
  const [sendJoinRequest] = useSendJoinRequestMutation();
  const [joinRequestLoading, setJoinRequestLoading] = useState<boolean>(false);
  const [deleteChannel] = useDeleteChannelMutation();
  const dispatch = useDispatch<AppDispatch>();

  if (!user) return <NotLoggedIn />;

  const memberIds: string[] = channel.members.map((member: Follower) => {
    return member._id.toString();
  });

  const handleSendJoinRequest = async (): Promise<void> => {
    try {
      setJoinRequestLoading(true);
      const { data, error } = await sendJoinRequest(channel._id);
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

  const handleDeleteChannel = async (): Promise<void> => {
    try {
      const { data, error } = await deleteChannel(channel._id);
      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as DeleteChannelApiResponse;

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
        dispatch(deleteChannelById(channel._id));
        dispatch(filterSearchedChannelById(channel._id));
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
    <div className="bg-gray-50 w-full flex-col flex flex-1 p-4 rounded-lg shadow-lg hover:shadow-lg transition">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">{channel.name}</h3>
          <p className="text-sm text-gray-600">{channel.description}</p>
        </div>

        {channel.creatorId._id === user._id && (
          <Menu.Root>
            <Menu.Trigger asChild>
              <div className="flex bg-gray-200 cursor-pointer h-max p-[6px] rounded-lg">
                <BsThreeDotsVertical className="text-sm" />
              </div>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    onClick={handleDeleteChannel}
                    value="new-txt-a"
                    className="gap-2 cursor-pointer text-xs p-2"
                  >
                    Delete Channel{" "}
                    <Menu.ItemCommand className="ml-2">
                      <MdDelete />
                    </Menu.ItemCommand>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        )}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {channel.members.length} members
        </span>

        <div className="flex gap-2">
          <Link
            href={`/channels/info/${channel._id}`}
            className="border-blue-500 text-blue-500 border-2 font-semibold px-2 box-border rounded-md"
          >
            View
          </Link>

          {memberIds.includes(user._id) ||
          channel.creatorId._id === user._id ? (
            <Link
              href={`/channels/chats/${channel._id}`}
              className="bg-blue-500 text-white flex items-center justify-center font-semibold px-2 box-border rounded-md"
            >
              Chat
            </Link>
          ) : (
            <button
              onClick={handleSendJoinRequest}
              className="bg-blue-500 flex items-center justify-center text-white w-14 font-semibold rounded-md hover:bg-blue-600"
            >
              {joinRequestLoading ? <Spinner variant={null} /> : "Join"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelItem;
