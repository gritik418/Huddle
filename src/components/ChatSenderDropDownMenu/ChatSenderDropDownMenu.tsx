"use client";
import Link from "next/link";
import { JSX } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { MdBlock, MdDelete } from "react-icons/md";
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
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { clearMessages } from "../../features/message/messageSlice";
import { removeChat } from "../../features/chat/chatSlice";
import { useRouter } from "next/navigation";

type PropsType = {
  sender: Follower;
  chatId: string;
};

const ChatSenderDropDownMenu = ({ sender, chatId }: PropsType): JSX.Element => {
  const [clearChat] = useClearChatMutation();
  const [deleteChat] = useDeleteChatMutation();
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
  return (
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

          <DropdownMenuItem className="text-xs gap-2 cursor-pointer font-medium">
            <MdBlock className="text-gray-600" /> Block User
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatSenderDropDownMenu;
