"use client";
import {
  ChannelInviteApiResponse,
  useInviteToChannelMutation,
} from "@/features/api/channelInviteApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { JSX, useState } from "react";
import { Bounce, toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

const InviteMemberItem = ({
  member,
  channelId,
}: {
  member: Follower;
  channelId: string;
}): JSX.Element => {
  const [invite] = useInviteToChannelMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleInviteToChannel = async (): Promise<void> => {
    try {
      setLoading(true);
      const { data, error } = await invite({
        channelId,
        receiverId: member._id,
      });
      setLoading(false);
      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as ChannelInviteApiResponse;

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
    <div className="bg-white flex justify-between items-center rounded-lg p-2">
      <div className="flex items-center gap-2">
        <div className="flex h-16 w-16 rounded-full">
          <Image
            src={member.profilePicture || "/images/default-profile.jpg"}
            alt="avatar"
            height={60}
            className="h-full w-full rounded-full"
            width={60}
          />
        </div>

        <div className="flex flex-col">
          <p>
            {member.firstName} {member.lastName}
          </p>
          <p>@{member.username}</p>
        </div>
      </div>

      <div
        onClick={handleInviteToChannel}
        className="flex items-center justify-center h-8 w-16 bg-[var(--secondary)] rounded-md font-medium cursor-pointer hover:bg-[var(--primary)] transition-colors ease-in-out duration-300 text-white"
      >
        {loading ? <Spinner variant={null} /> : "Invite"}
      </div>
    </div>
  );
};

export default InviteMemberItem;
