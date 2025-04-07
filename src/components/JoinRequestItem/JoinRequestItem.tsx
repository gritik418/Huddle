import { useGetChannelByIdQuery } from "../../features/api/channelApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { JSX, useState } from "react";
import { Bounce, toast } from "react-toastify";
import {
  JoinRequestApiResponse,
  useAcceptJoinRequestMutation,
  useDeclineJoinRequestMutation,
  useGetJoinRequestsQuery,
} from "../../features/api/joinRequestApi";
import Spinner from "../Spinner/Spinner";

type RefetchJoinRequestType = ReturnType<
  typeof useGetJoinRequestsQuery
>["refetch"];
type RefetchChannelType = ReturnType<typeof useGetChannelByIdQuery>["refetch"];

interface PropsType {
  request: JoinRequest;
  refetch: RefetchChannelType;
  refetchJoinRequest: RefetchJoinRequestType;
}

const JoinRequestItem = ({
  request,
  refetch,
  refetchJoinRequest,
}: PropsType): JSX.Element => {
  const [acceptJoinRequest] = useAcceptJoinRequestMutation();
  const [declineJoinRequest] = useDeclineJoinRequestMutation();
  const [acceptRequestLoading, setAcceptRequestLoading] =
    useState<boolean>(false);
  const [declineRequestLoading, setDeclineRequestLoading] =
    useState<boolean>(false);

  const handleAcceptJoinRequest = async (requestId: string): Promise<void> => {
    try {
      setAcceptRequestLoading(true);
      const { data, error } = await acceptJoinRequest(requestId);
      await refetchJoinRequest();
      await refetch();
      setAcceptRequestLoading(false);
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

  const handleDeclineJoinRequest = async (requestId: string): Promise<void> => {
    try {
      setDeclineRequestLoading(true);
      const { data, error } = await declineJoinRequest(requestId);
      await refetchJoinRequest();
      await refetch();
      setDeclineRequestLoading(false);
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
    <div
      key={request._id}
      className="flex flex-col gap-3 lg:flex-row lg:items-center justify-between p-4 rounded-xl bg-gray-50 border hover:shadow-md transition"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 rounded-full">
          <Image
            src={request.userId.profilePicture || "/images/default-profile.jpg"}
            alt={"avatar"}
            width={40}
            height={40}
            className="rounded-full object-cover h-full w-full"
          />
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {request.userId.firstName} {request.userId?.lastName}
          </p>
          <p className="text-gray-600 font-medium">{request.userId.username}</p>
        </div>
      </div>

      <div className="flex gap-2 justify-end w-full">
        <button
          onClick={() => handleAcceptJoinRequest(request._id)}
          className="w-16 flex items-center justify-center py-1 text-sm text-white bg-green-500 hover:bg-green-600 rounded-lg transition"
        >
          {acceptRequestLoading ? <Spinner variant={null} /> : "Accept"}
        </button>
        <button
          onClick={() => handleDeclineJoinRequest(request._id)}
          className="w-16 flex items-center justify-center py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
        >
          {declineRequestLoading ? <Spinner variant={null} /> : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default JoinRequestItem;
