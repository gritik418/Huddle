import Image from "next/image";
import React, { JSX } from "react";
import {
  MenuContent,
  MenuContextTrigger,
  MenuItem,
  MenuRoot,
} from "../ui/menu";
import { useDeleteMessageForMeMutation } from "@/features/api/messageApi";
import { Bounce, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { removeMessage } from "@/features/message/messageSlice";

type PropsType = { isSent: boolean; message: Message };

const MessageItem = ({ isSent, message }: PropsType): JSX.Element => {
  const [deleteForMe] = useDeleteMessageForMeMutation();
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteForMe = async () => {
    try {
      const { data } = await deleteForMe(message._id);
      if (data) {
        dispatch(removeMessage(message._id));
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

  return isSent ? (
    <MenuRoot>
      <MenuContextTrigger w="max-content" asChild>
        <div className="bg-[var(--secondary)] w-max ml-auto max-w-[85%] p-2 my-2 px-4 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl">
          <p className="text-white w-max text-xs font-medium text-wrap">
            {message.content}
          </p>
        </div>
      </MenuContextTrigger>
      <MenuContent>
        <MenuItem
          onClick={handleDeleteForMe}
          className="text-xs"
          value="delete-for-me"
        >
          Delete for me
        </MenuItem>
        <MenuItem className="text-xs" value="unsend">
          Unsend
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  ) : (
    <MenuRoot>
      <MenuContextTrigger w="max-content" asChild>
        <div className="flex my-2 items-start gap-1">
          <Image
            src={message.sender.profilePicture || "/images/default-profile.jpg"}
            className="h-5 w-5 rounded-full"
            alt="profile-image"
            height={40}
            width={40}
          />
          <div className="bg-white p-2 px-4 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl">
            <p className="text-gray-600 text-xs w-max font-medium">
              {message.content}
            </p>
          </div>
        </div>
      </MenuContextTrigger>
      <MenuContent>
        <MenuItem
          onClick={handleDeleteForMe}
          className="text-xs"
          value="delete-for-me"
        >
          Delete for me
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default MessageItem;
