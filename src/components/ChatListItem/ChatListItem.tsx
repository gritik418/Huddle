import { selectOnlineMembers, selectUser } from "../../features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import { useSelector } from "react-redux";

type PropsType = {
  chat: Chat;
  chatId: string | null;
};

const ChatListItem = ({ chat, chatId }: PropsType): JSX.Element => {
  const user: User | null = useSelector(selectUser);
  const activeMembers: string[] = useSelector(selectOnlineMembers);

  const formatChatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }); // 2:30 PM
    } else if (isYesterday) {
      return "Yesterday";
    } else if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: "short", day: "numeric" }); // Apr 6
    } else {
      return date.toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
      }); // Apr 6, 2023
    }
  };

  let isSelected: boolean = false;
  if (chatId) {
    isSelected = chatId === chat._id;
  }

  if (chat.isGroupChat) {
    return (
      <Link
        href={`/chat/${chat._id}`}
        className={`flex items-center my-2 p-2 rounded-xl justify-between cursor-pointer ${
          isSelected ? "bg-[var(--secondary)]" : "bg-gray-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full">
            <Image
              src={chat?.groupIcon || "/images/default-group-icon.png"}
              alt="proofile-image"
              className="h-12 w-12 rounded-full object-cover"
              height={48}
              width={48}
            />
          </div>

          <div className="flex flex-col">
            <p
              className={`text-sm font-semibold ${
                isSelected ? "text-white" : "text-black"
              }`}
            >
              {chat?.groupName}
            </p>

            {chat.lastMessage && (
              <p
                className={`text-xs text-gray-400 font-medium ${
                  isSelected ? "text-gray-50" : "text-black"
                }`}
              >
                {chat.lastMessage?.content}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p
            className={`text-[10px] font-semibold ${
              isSelected ? "text-white" : "text-black"
            }`}
          >
            {chat?.lastMessage?.updatedAt &&
              formatChatTime(chat.lastMessage?.updatedAt)}
          </p>
        </div>
      </Link>
    );
  }

  const sender: ChatMember = chat.members.filter(
    (member: ChatMember) => member._id !== user?._id
  )[0];

  return (
    <Link
      href={`/chat/${chat._id}`}
      className={`flex items-center my-2 p-2 rounded-xl justify-between cursor-pointer ${
        isSelected ? "bg-[var(--secondary)]" : "bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="min-h-12 h-12 w-12 min-w-12 rounded-full relative">
          <Image
            src={sender.profilePicture || "/images/default-profile.jpg"}
            alt="proofile-image"
            className="h-full w-full rounded-full object-cover"
            height={48}
            width={48}
          />

          {user?.showActiveStatus && activeMembers.includes(sender?._id) && (
            <span className="absolute h-[10px] w-[10px] bg-green-500 bottom-0 right-1 rounded-full"></span>
          )}
        </div>

        <div className="flex flex-col">
          <p
            className={`text-sm font-semibold ${
              isSelected ? "text-white" : "text-black"
            }`}
          >
            {sender.firstName} {sender.lastName}
          </p>

          {chat.lastMessage && (
            <p
              className={`text-xs text-gray-400 font-medium ${
                isSelected ? "text-gray-50" : "text-black"
              }`}
            >
              {chat.lastMessage?.content.length > 30
                ? chat.lastMessage.content.slice(0, 30) + "..."
                : chat.lastMessage?.content}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col w-max items-center gap-1">
        <p
          className={`text-[10px] font-semibold ${
            isSelected ? "text-white" : "text-black"
          }`}
        >
          {chat?.lastMessage?.updatedAt &&
            formatChatTime(chat.lastMessage?.updatedAt)}
        </p>
      </div>
    </Link>
  );
};

export default ChatListItem;
