import {
  ChatRequestApiResponse,
  useAcceptChatRequestMutation,
  useDeclineChatRequestMutation,
} from "@/features/api/chatRequestApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { JSX, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Bounce, toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { removeChatRequest } from "@/features/chatRequest/chatRequestSlice";
import Link from "next/link";

type PropsType = {
  chatRequest: ChatRequest;
};

const ChatRequestItem = ({ chatRequest }: PropsType): JSX.Element => {
  const [acceptChatRequest] = useAcceptChatRequestMutation();
  const [declineChatRequest] = useDeclineChatRequestMutation();
  const dispatch = useDispatch<AppDispatch>();
  const [acceptRequestLoading, setAcceptRequestLoading] =
    useState<boolean>(false);
  const [declineRequestLoading, setDeclineRequestLoading] =
    useState<boolean>(false);

  const handleAcceptChatRequest = async (requestId: string) => {
    try {
      setAcceptRequestLoading(true);
      const { data, error } = await acceptChatRequest(requestId);
      setAcceptRequestLoading(false);

      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as ChatRequestApiResponse;

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
        }
      }

      if (data?.success) {
        dispatch(removeChatRequest(requestId));

        if (data.message) {
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
      } else {
        if (data?.message) {
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
          return;
        }
      }
    } catch (error) {
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

  const handleDeclineChatRequest = async (requestId: string) => {
    try {
      setDeclineRequestLoading(true);
      const { data, error } = await declineChatRequest(requestId);
      setDeclineRequestLoading(false);

      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as ChatRequestApiResponse;

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
        }
      }

      if (data?.success) {
        dispatch(removeChatRequest(requestId));

        if (data.message) {
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
      } else {
        if (data?.message) {
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
          return;
        }
      }
    } catch (error) {
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
    <div className="flex justify-between items-center gap-5 hover:bg-gray-50 p-1 rounded-md">
      <div className="flex items-center gap-1">
        <Link
          href={`/user/${chatRequest.sender.username}`}
          className="flex h-12 w-12 rounded-full"
        >
          <Image
            src={
              chatRequest.sender?.profilePicture ||
              "/images/default-profile.jpg"
            }
            alt="profile"
            height={50}
            width={50}
            className="h-12 w-12 rounded-full"
          />
        </Link>

        <div className="flex flex-col">
          <Link
            href={`/user/${chatRequest.sender.username}`}
            className="text-sm font-semibold"
          >
            {chatRequest.sender.firstName} {chatRequest.sender?.lastName}
          </Link>

          <p className="text-xs font-medium text-gray-500">
            @{chatRequest.sender.username}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mx-2">
        <button
          disabled={declineRequestLoading}
          onClick={() => handleDeclineChatRequest(chatRequest._id)}
          className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-md text-red-400 bg-red-100"
        >
          {declineRequestLoading ? <Spinner variant={null} /> : <MdDelete />}
        </button>

        <button
          disabled={acceptRequestLoading}
          onClick={() => handleAcceptChatRequest(chatRequest._id)}
          className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-md text-green-500 bg-green-200"
        >
          {acceptRequestLoading ? <Spinner variant={null} /> : <FaCheck />}
        </button>
      </div>
    </div>
  );
};

export default ChatRequestItem;
