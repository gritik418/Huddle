import { JSX } from "react";
import ChannelChats from "../../../../components/ChannelChats/ChannelChats";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="w-full min-h-[calc(100vh-56px-16px-24px)] gap-2 h-[calc(100vh-56px-16px-24px)] bg-white p-2 flex rounded-lg">
      <div className="min-w-[280px] items-center h-full overflow-y-scroll hide-scrollbar">
        <ChannelChats />
      </div>

      <div className="flex flex-1 h-full items-center justify-center w-full">
        {children}
      </div>
    </div>
  );
}
