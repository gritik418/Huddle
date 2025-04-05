import { selectUser } from "../../features/user/userSlice";
import { JSX } from "react";
import { useSelector } from "react-redux";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";
import Image from "next/image";

const ChannelMessageItem = ({
  message,
}: {
  message: ChannelMessage;
}): JSX.Element => {
  const user: User | null = useSelector(selectUser);

  if (!user) return <NotLoggedIn />;

  if (message.sender._id === user._id)
    return (
      <div className="bg-blue-400 self-end w-max max-w-[70%] p-1 px-3 text-white font-semibold rounded-full">
        {message.content}
      </div>
    );

  return (
    <div className="flex items-start justify-start gap-1">
      <div className="flex h-5 w-5 rounded-full">
        <Image
          src={message.sender.profilePicture || "/images/default-profile.jpg"}
          alt="avatar"
          height={30}
          width={30}
          className="h-full w-full object-cover rounded-full"
        />
      </div>
      <div className="bg-gray-200 w-max max-w-[70%] p-1 px-3 text-gray-600 font-normal rounded-full">
        {message.content}
      </div>
    </div>
  );
};

export default ChannelMessageItem;
