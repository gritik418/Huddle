import {
  ChannelInviteApiResponse,
  useAcceptChannelInviteMutation,
  useDeclineChannelInviteMutation,
} from "../../features/api/channelInviteApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { JSX, useState } from "react";
import { Bounce, toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

const ChannelInviteItem = ({
  invite,
}: {
  invite: ChannelInvite;
}): JSX.Element => {
  const sender = invite.senderId;
  const channel = invite.channelId;
  const [acceptInvite] = useAcceptChannelInviteMutation();
  const [declineInvite] = useDeclineChannelInviteMutation();
  const [acceptLoading, setAcceptLoading] = useState<boolean>(false);
  const [declineLoading, setDeclineLoading] = useState<boolean>(false);

  const handleAcceptInvite = async (): Promise<void> => {
    try {
      setAcceptLoading(true);
      const { data, error } = await acceptInvite(invite._id);
      setAcceptLoading(false);
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

  const handleDeclineInvite = async (): Promise<void> => {
    try {
      setDeclineLoading(true);
      const { data, error } = await declineInvite(invite._id);
      setDeclineLoading(false);
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
    <div className="bg-white border shadow-sm rounded-2xl p-5 mb-4 transition hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={sender?.profilePicture || "/default-profile.jpg"}
          alt={sender?.username}
          height={50}
          width={50}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-sm text-gray-800 font-semibold">
            {sender.firstName} {sender?.lastName || ""}
          </p>
          <p className="text-xs text-gray-500">@{sender.username}</p>
          <p className="text-xs text-gray-400 mt-1 italic">
            sent you an invite
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-lg font-semibold text-gray-800">{channel.name}</p>
        <p className="text-sm text-gray-600 mt-1">{channel.description}</p>
        <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
          <span>
            Type: <strong className="capitalize">{channel.type}</strong>
          </span>
          <span>
            {channel.members.length} member
            {channel.members.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={handleDeclineInvite}
          className="h-8 w-16 flex items-center justify-center outline-none text-sm rounded-lg border text-white bg-red-500 hover:bg-red-600 transition"
        >
          {declineLoading ? <Spinner variant={null} /> : "Decline"}
        </button>
        <button
          onClick={handleAcceptInvite}
          className="h-8 w-16 flex items-center justify-center outline-none text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {acceptLoading ? <Spinner variant={null} /> : "Accept"}
        </button>
      </div>
    </div>
  );
};

export default ChannelInviteItem;
