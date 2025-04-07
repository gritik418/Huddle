import Image from "next/image";
import { JSX } from "react";

const ChannelInviteItem = ({
  invite,
}: {
  invite: ChannelInvite;
}): JSX.Element => {
  const sender = invite.senderId;
  const channel = invite.channelId;

  return (
    <div className="bg-white border shadow-sm rounded-2xl p-5 mb-4 transition hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={sender.profilePicture || "/default-profile.jpg"}
          alt={sender.username}
          height={50}
          width={50}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-sm text-gray-800 font-semibold">
            {sender.firstName} {sender.lastName || ""}
          </p>
          <p className="text-xs text-gray-500">@{sender.username}</p>
          <p className="text-xs text-gray-400 mt-1 italic">
            sent you an invite
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-lg font-semibold text-gray-800">{channel.name}</p>
        <p className="text-sm text-gray-600 mt-1">{channel.description}</p>
        <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
          <span>
            Type: <strong className="capitalize">{channel.type}</strong>
          </span>
          <span>
            {channel.members.length} member
            {channel.members.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button className="px-4 py-1.5 text-sm rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition">
          Decline
        </button>
        <button className="px-4 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
          Accept
        </button>
      </div>
    </div>
  );
};

export default ChannelInviteItem;
