import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

const ChannelChatItem = ({ channel }: { channel: Channel }): JSX.Element => {
  const pathname: string = usePathname();

  return (
    <Link
      href={`/channels/chats/${channel._id}`}
      className={`flex flex-col p-5 items-start gap-2 w-full rounded-lg ${
        pathname.includes(channel._id)
          ? "bg-[var(--secondary)] text-white font-semibold"
          : "bg-gray-100"
      }`}
    >
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{channel.name}</p>

        <p className="text-xs">{channel.description}</p>
      </div>

      <div className="flex flex-col mt-6">
        <p className="text-xs">
          {channel.members.length}{" "}
          {channel.members.length > 1 ? "members" : "member"}
        </p>
      </div>
    </Link>
  );
};

export default ChannelChatItem;
