"use client";
import {
  GroupApiResponse,
  useLeaveGroupMutation,
} from "../../features/api/groupApi";
import Link from "next/link";
import { JSX } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { ImExit } from "react-icons/im";
import { useDispatch } from "react-redux";
import { Bounce, toast } from "react-toastify";
import { AppDispatch } from "../../app/store";
import { useClearChatMutation } from "../../features/api/chatApi";
import { clearMessages } from "../../features/message/messageSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";

const GroupOptionsDropDownMenu = ({
  chatId,
}: {
  chatId: string;
}): JSX.Element => {
  const [clearChat] = useClearChatMutation();
  const [leaveGroup] = useLeaveGroupMutation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleClearChat = async () => {
    try {
      const { data } = await clearChat(chatId);
      if (data?.success) {
        dispatch(clearMessages());
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error.", {
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

  const handleLeaveGroup = async () => {
    try {
      const { data, error } = await leaveGroup(chatId);
      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as GroupApiResponse;

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
        router.push("/chat");
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
      toast.error("Server Error.", {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex p-2 rounded-lg cursor-pointer bg-gray-200 items-center justify-center">
          <BsThreeDotsVertical />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          <Link href={`/group/${chatId}`}>
            <DropdownMenuItem className="flex cursor-pointer text-xs font-medium items-center gap-2 w-full">
              <FaUsers className="text-gray-600" /> Group Information
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            onClick={handleClearChat}
            className="text-xs gap-2 cursor-pointer font-medium"
          >
            <GiBroom className="text-gray-600" /> Clear Chat
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleLeaveGroup}
            className="text-xs gap-2 cursor-pointer font-medium"
          >
            <ImExit className="text-gray-600" /> Leave Group
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GroupOptionsDropDownMenu;
