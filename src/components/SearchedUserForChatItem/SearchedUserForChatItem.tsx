import Image from "next/image";
import React, { JSX, useState } from "react";
import { BiSolidMessageAdd } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  SendChatRequestApiResponse,
  useSendChatRequestMutation,
} from "@/features/api/chatRequestApi";
import { Bounce, toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Spinner from "../Spinner/Spinner";

const SearchedUserForChatItem = (user: SearchedUserForChat): JSX.Element => {
  const [sendChatRequest] = useSendChatRequestMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendChatRequest = async () => {
    try {
      setLoading(true);
      const { data, error } = await sendChatRequest(user._id);
      setLoading(false);
      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as SendChatRequestApiResponse;

        if (parsedError?.message) {
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
          return;
        } else {
          toast.error("Some error occured.", {
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
      } else {
        if (data.success) {
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
        } else {
          toast.error(data.message, {
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
      }
    } catch (error) {
      console.error(error);
      toast.error("Some error occured.", {
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
    <div className="flex gap-2 bg-gray-200 p-2 items-center w-full rounded-lg justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-12 w-12 rounded-full">
          <Image
            src={user.profilePicture || "/images/default-profile.jpg"}
            alt="profile"
            height={50}
            width={50}
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">
            {user.firstName} {user.lastName}
          </p>

          <p className="text-xs font-medium text-gray-500">@{user.username}</p>
        </div>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {loading ? (
              <div className="flex mr-2 h-8 w-8 items-center justify-center">
                <Spinner variant="xs" />
              </div>
            ) : (
              <button
                disabled={loading}
                onClick={handleSendChatRequest}
                className="flex mr-2 h-8 w-8 items-center justify-center cursor-pointer"
              >
                <BiSolidMessageAdd className="text-2xl text-[var(--secondary)]" />
              </button>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Send chat request</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SearchedUserForChatItem;
