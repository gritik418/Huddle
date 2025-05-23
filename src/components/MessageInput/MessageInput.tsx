import { SEND_MESSAGE } from "../../constants/events";
import { useSocket } from "../../contexts/socket/SocketProvider";
import { selectUser } from "../../features/user/userSlice";
import { Textarea } from "@chakra-ui/react";
import { ChangeEvent, JSX, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

const MessageInput = ({
  chatId,
  chat,
}: {
  chatId: string;
  chat: Chat;
}): JSX.Element => {
  const socket: Socket | null = useSocket();
  const user: User | null = useSelector(selectUser);
  const [content, setContent] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSendMessage = () => {
    const message = {
      chatId,
      content,
      sender: user?._id,
      status: "sent",
    };

    const members = chat.members.map((member: ChatMember) => member._id);
    socket?.emit(SEND_MESSAGE, { message, chat: { ...chat, members } });
    setContent("");
  };

  return (
    <div className="h-20 bg-[#f2f2f2] flex items-start justify-center pt-2">
      <div className="flex h-14 bg-white w-full max-w-[90%] gap-2 pl-5 rounded-full items-center p-1 justify-between">
        <Textarea
          placeholder="Type here..."
          onChange={handleChange}
          autoFocus
          value={content}
          className="flex-1 p-3 h-14 hide-scrollbar resize-none outline-none text-lg text-gray-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={content === ""}
          className="flex h-12 w-12 rounded-full bg-[var(--secondary)] items-center justify-center"
        >
          <BsFillSendFill className="text-white text-lg" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
