"use client";
import Link from "next/link";
import { JSX, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { MdBlock, MdDelete } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  useClearChatMutation,
  useDeleteChatMutation,
} from "../../features/api/chatApi";
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { clearMessages } from "../../features/message/messageSlice";
import { removeChat } from "../../features/chat/chatSlice";
import { useRouter } from "next/navigation";
import {
  useBlockUserMutation,
  useUnblockUserMutation,
} from "../../features/api/blockUserApi";
import {
  addToBlockedUsers,
  removeFromBlockedUsers,
  selectBlockedUserIds,
} from "../../features/user/userSlice";
import Spinner from "../Spinner/Spinner";

type PropsType = {
  sender: Follower;
  chatId: string;
};

const ChatSenderDropDownMenu = ({ sender, chatId }: PropsType): JSX.Element => {
  const [clearChat] = useClearChatMutation();
  const [deleteChat] = useDeleteChatMutation();
  const dispatch = useDispatch<AppDispatch>();
  const [blockUser] = useBlockUserMutation();
  const [showUnblockModal, setShowUnblockModal] = useState<boolean>(false);
  const [unblock] = useUnblockUserMutation();
  const [unblockLoading, setUnblockLoading] = useState<boolean>(false);
  const blockedUserIds = useSelector(selectBlockedUserIds);
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

  const handleDeleteChat = async () => {
    try {
      const { data } = await deleteChat(chatId);
      if (data?.success) {
        dispatch(removeChat({ chatId }));
        router.push("/chat");
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

  const handleBlock = async (): Promise<void> => {
    const { data: res } = await blockUser(sender._id);
    if (res?.success) {
      dispatch(addToBlockedUsers(sender._id));
    }
  };

  const handleUnblock = async () => {
    try {
      setUnblockLoading(true);
      const { data: res } = await unblock(sender._id);
      setUnblockLoading(false);
      if (res?.success) {
        dispatch(removeFromBlockedUsers(sender._id));
      }
      setShowUnblockModal(false);
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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex p-2 rounded-lg cursor-pointer bg-gray-200 items-center justify-center">
            <BsThreeDotsVertical />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          <DropdownMenuGroup>
            <Link href={`/user/${sender.username}`}>
              <DropdownMenuItem className="flex cursor-pointer text-xs font-medium items-center gap-2 w-full">
                <FaUserCircle className="text-gray-600" /> User Profile
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              onClick={handleClearChat}
              className="text-xs gap-2 cursor-pointer font-medium"
            >
              <GiBroom className="text-gray-600" /> Clear Chat
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleDeleteChat}
              className="text-xs gap-2 cursor-pointer font-medium"
            >
              <MdDelete className="text-gray-600" /> Delete Chat
            </DropdownMenuItem>

            {blockedUserIds.includes(sender._id) ? (
              <DropdownMenuItem
                onClick={() => setShowUnblockModal(true)}
                className="text-xs gap-2 cursor-pointer font-medium"
              >
                <CgUnblock className="text-gray-600" /> Unblock User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={handleBlock}
                className="text-xs gap-2 cursor-pointer font-medium"
              >
                <MdBlock className="text-gray-600" /> Block User
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {showUnblockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Unblock User
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to unblock{" "}
              <strong>
                {sender.firstName} {sender?.lastName}
              </strong>
              ?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowUnblockModal(false)}
                className="bg-gray-300 text-gray-700 h-10 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUnblock}
                className="bg-red-600 hover:bg-red-700 w-32 text-white h-10 rounded-md flex items-center justify-center"
              >
                {unblockLoading ? <Spinner variant={null} /> : "Yes, Unblock"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatSenderDropDownMenu;
