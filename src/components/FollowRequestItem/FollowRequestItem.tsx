import { AppDispatch } from "@/app/store";
import {
  FollowRequestApiResponse,
  useAcceptFollowRequestMutation,
  useDeclineFollowRequestMutation,
} from "@/features/api/followRequestApi";
import { removeFollowRequest } from "@/features/followRequest/followRequestSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import Link from "next/link";
import { JSX, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Bounce, toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

const FollowRequestItem = ({
  request,
}: {
  request: FollowRequest;
}): JSX.Element => {
  const [acceptFollowRequest] = useAcceptFollowRequestMutation();
  const [declineFollowRequest] = useDeclineFollowRequestMutation();

  const dispatch = useDispatch<AppDispatch>();

  const [acceptRequestLoading, setAcceptRequestLoading] =
    useState<boolean>(false);
  const [declineRequestLoading, setDeclineRequestLoading] =
    useState<boolean>(false);

  const handleAcceptFollowRequest = async (requestId: string) => {
    try {
      setAcceptRequestLoading(true);
      const { data, error } = await acceptFollowRequest(requestId);
      setAcceptRequestLoading(false);

      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as FollowRequestApiResponse;

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
        dispatch(removeFollowRequest(requestId));

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

  const handleDeclineFollowRequest = async (requestId: string) => {
    try {
      setDeclineRequestLoading(true);
      const { data, error } = await declineFollowRequest(requestId);
      setDeclineRequestLoading(false);

      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as FollowRequestApiResponse;

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
        dispatch(removeFollowRequest(requestId));

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
    <div className="flex flex-col gap-1 hover:bg-gray-50 p-1 rounded-lg cursor-pointer">
      <div className="flex items-center gap-1">
        <Link
          href={`/user/${request.sender.username}`}
          className="flex h-12 w-12 rounded-full"
        >
          <Image
            src={
              request.sender?.profilePicture || "/images/default-profile.jpg"
            }
            alt="profile"
            height={50}
            width={50}
            className="h-12 w-12 rounded-full"
          />
        </Link>

        <div className="flex flex-col">
          <Link
            href={`/user/${request.sender.username}`}
            className="text-sm font-semibold"
          >
            {request.sender.firstName} {request.sender?.lastName}
          </Link>

          <p className="text-xs font-medium text-gray-500">
            @{request.sender.username}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mx-2 justify-end">
        <button
          disabled={declineRequestLoading}
          onClick={() => handleDeclineFollowRequest(request._id)}
          className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-md text-red-400 bg-red-100"
        >
          {declineRequestLoading ? <Spinner variant={null} /> : <MdDelete />}
        </button>

        <button
          disabled={acceptRequestLoading}
          onClick={() => handleAcceptFollowRequest(request._id)}
          className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-md text-green-500 bg-green-200"
        >
          {acceptRequestLoading ? <Spinner variant={null} /> : <FaCheck />}
        </button>
      </div>
    </div>
  );
};

export default FollowRequestItem;
