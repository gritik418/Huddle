import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

const ChannelChatItem = ({ channel }: { channel: Channel }): JSX.Element => {
  const pathname: string = usePathname();

  return (
    <Link
      href={`/channels/chats/${channel._id}`}
      className={`flex p-2 items-center gap-2 rounded-lg ${
        pathname.includes(channel._id)
          ? "bg-[var(--secondary)] text-white font-semibold"
          : "bg-gray-50"
      }`}
    >
      <div className="flex h-12 w-12 rounded-full">
        <Image
          src={"/images/default-profile.jpg"}
          alt="icon"
          height={60}
          width={60}
          className="h-full w-full rounded-full"
        />
      </div>

      <div className="flex">
        <p>{channel.name}</p>
      </div>
    </Link>
  );
};

export default ChannelChatItem;
