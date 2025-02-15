import { AppDispatch } from "@/app/store";
import {
  ChatRequestApiResponse,
  useAcceptChatRequestMutation,
  useDeclineChatRequestMutation,
} from "@/features/api/chatRequestApi";
import { removeChatRequest } from "@/features/chatRequest/chatRequestSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { JSX, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Bounce, toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

const Notification = ({
  type,
  chatRequest,
  message,
}: NotificationData): JSX.Element => {
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

  switch (type) {
    case "CHAT_REQUEST":
      return (
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2">
            <Image
              src={
                chatRequest?.sender.profilePicture ||
                "/images/default-profile.jpg"
              }
              alt="img"
              height={50}
              width={50}
            />

            <div className="flex flex-col">
              <p className="text-sm font-bold">
                {chatRequest?.sender.firstName} {chatRequest?.sender.lastName}
              </p>
              <p className="text-sm font-medium">
                {chatRequest?.sender.username}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-sm font-bold">Sent you a chat request.</p>
            <div className="flex gap-2 ml-auto">
              <button
                disabled={declineRequestLoading}
                onClick={() => handleDeclineChatRequest(chatRequest?._id!)}
                className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-md text-red-400 bg-red-100"
              >
                {declineRequestLoading ? (
                  <Spinner variant={null} />
                ) : (
                  <MdDelete />
                )}
              </button>

              <button
                disabled={acceptRequestLoading}
                onClick={() => handleAcceptChatRequest(chatRequest?._id!)}
                className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-md text-green-500 bg-green-200"
              >
                {acceptRequestLoading ? (
                  <Spinner variant={null} />
                ) : (
                  <FaCheck />
                )}
              </button>
            </div>
          </div>
        </div>
      );

    case "NEW_MESSAGE":
      return (
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2">
            <Image
              src={
                message?.sender.profilePicture || "/images/default-profile.jpg"
              }
              alt="img"
              height={50}
              width={50}
            />

            <div className="flex flex-col">
              <p className="text-sm font-bold">
                {message?.sender.firstName} {message?.sender.lastName}
              </p>
              <p className="text-sm font-medium">{message?.sender.username}</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <p className="text-sm font-bold">{message?.content}</p>
          </div>
        </div>
      );

    default:
      return (
        <div>
          <Image
            src={"/images/default-profile.jpg"}
            alt="img"
            height={50}
            width={50}
          />
          <p></p>
        </div>
      );
  }
};

export default Notification;
