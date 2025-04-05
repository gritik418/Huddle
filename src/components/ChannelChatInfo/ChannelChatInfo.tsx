import Link from "next/link";
import { JSX } from "react";

const ChannelChatInfo = ({ channel }: { channel: Channel }): JSX.Element => {
  return (
    <Link
      href={`/channels/info/${channel._id}`}
      className="bg-[var(--primary)] text-white p-3 flex items-center gap-2 rounded-lg"
    >
      <div className="flex flex-col">
        <p className="font-semibold">{channel.name}</p>
        <p className="text-xs font-semibold mt-3">
          {channel.members.length}{" "}
          {channel.members.length > 1 ? "members" : "member"}
        </p>
      </div>
    </Link>
  );
};

export default ChannelChatInfo;
