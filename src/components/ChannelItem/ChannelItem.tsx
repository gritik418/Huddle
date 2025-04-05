import { selectUser } from "../../features/user/userSlice";
import Link from "next/link";
import { JSX } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";

const ChannelItem = ({ channel }: { channel: Channel }): JSX.Element => {
  const user = useSelector(selectUser);

  if (!user) return <NotLoggedIn />;

  console.log(channel);

  const memberIds: string[] = channel.members.map((member: Follower) => {
    return member._id.toString();
  });
  return (
    <div className="bg-gray-50 w-full flex-col flex flex-1 p-4 rounded-lg shadow-lg hover:shadow-lg transition">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">{channel.name}</h3>
          <p className="text-sm text-gray-600">{channel.description}</p>
        </div>

        <div className="flex bg-gray-200 cursor-pointer h-max p-[6px] rounded-lg">
          <BsThreeDotsVertical className="text-sm" />
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {channel.members.length} members
        </span>

        <div className="flex gap-2">
          <Link
            href={`/channels/info/${channel._id}`}
            className="border-blue-500 text-blue-500 border-2 font-semibold px-2 box-border rounded-md"
          >
            View
          </Link>

          {memberIds.includes(user._id) ? (
            <Link
              href={`/channels/chats/${channel._id}`}
              className="bg-blue-500 text-white flex items-center justify-center font-semibold px-2 box-border rounded-md"
            >
              Chat
            </Link>
          ) : (
            <button className="bg-blue-500 text-white px-2 font-semibold rounded-md hover:bg-blue-600">
              Join
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelItem;
