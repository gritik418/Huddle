import { selectUser } from "../../features/user/userSlice";
import { JSX } from "react";
import { useSelector } from "react-redux";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";

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
    <div className="bg-blue-400 w-max max-w-[70%] p-1 px-3 text-white font-semibold rounded-full">
      {message.content}
    </div>
  );
};

export default ChannelMessageItem;
