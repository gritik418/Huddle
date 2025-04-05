"use client";
import { SEND_CHANNEL_MESSAGE } from "../../constants/events";
import { useSocket } from "../../contexts/socket/SocketProvider";
import { ChangeEvent, JSX, useState } from "react";
import { IoSend } from "react-icons/io5";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";

const ChannelChatInput = ({ channel }: { channel: Channel }): JSX.Element => {
  const [content, setContent] = useState<string>("");
  const socket: Socket | null = useSocket();
  const user: User | null = useSelector(selectUser);

  if (!user) return <NotLoggedIn />;

  const handleSendMessage = (): void => {
    if (!socket) return;

    socket.emit(SEND_CHANNEL_MESSAGE, {
      content,
      channel,
    });

    setContent("");
  };

  return (
    <div className="bg-gray-200 gap-3 flex items-center justify-between p-2 rounded-xl">
      <div className="flex flex-1">
        <input
          type="text"
          value={content}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setContent(e.target.value)
          }
          placeholder="Type here..."
          className="text-xl flex-1 outline-none p-1 pl-3 bg-transparent"
        />
      </div>

      <div
        onClick={handleSendMessage}
        className="flex p-3 px-6 cursor-pointer items-center justify-center rounded-lg bg-[var(--secondary)] text-white"
      >
        <IoSend className="text-2xl" />
      </div>
    </div>
  );
};

export default ChannelChatInput;
