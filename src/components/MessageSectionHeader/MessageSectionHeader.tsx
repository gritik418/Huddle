import { selectUser } from "@/features/user/userSlice";
import Image from "next/image";
import { JSX } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";

const MessageSectionHeader = ({ chat }: { chat: Chat }): JSX.Element => {
  const user: User | null = useSelector(selectUser);

  if (chat.isGroupChat) {
    return (
      <div className="h-16 border-b-2 justify-between border-gray-100 flex items-center p-2 px-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full">
            <Image
              src={chat?.groupIcon || "/images/default-group-icon.png"}
              alt="profile-image"
              className="h-10 w-10 rounded-full object-cover"
              height={40}
              width={40}
            />
          </div>

          <div className="flex flex-col py-1">
            <p className="text-sm font-medium">{chat.groupName}</p>
          </div>
        </div>

        <div className="flex h-10 w-10 rounded-full bg-gray-100 items-center justify-center">
          <BsThreeDotsVertical />
        </div>
      </div>
    );
  }

  const sender: ChatMember = chat.members.filter(
    (member: ChatMember) => member._id !== user?._id
  )[0];

  return (
    <div className="h-16 border-b-2 justify-between border-gray-100 flex items-center p-2 px-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full">
          <Image
            src={sender?.profilePicture || "/images/default-profile.jpg"}
            alt="profile-image"
            className="h-10 w-10 rounded-full object-cover"
            height={40}
            width={40}
          />
        </div>

        <div className="flex flex-col py-1">
          <p className="text-sm font-medium">
            {sender.firstName} {sender.lastName}
          </p>
          <p className="text-xs font-medium text-gray-400">{sender.username}</p>
        </div>
      </div>

      <div className="flex h-10 w-10 rounded-full bg-gray-100 items-center justify-center">
        <BsThreeDotsVertical />
      </div>
    </div>
  );
};

export default MessageSectionHeader;
