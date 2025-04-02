import ChannelTabs from "../../../../components/ChannelTabs/ChannelTabs";
import { JSX } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="flex flex-col min-h-[calc(100vh-56px-16px-24px)] w-full gap-3">
      <div className="bg-gradient-to-r rounded-lg from-blue-400 to-purple-500 text-white text-center p-6">
        <h1 className="text-3xl font-bold">Channels</h1>
        <p className="mt-2 text-sm font-semibold">
          Join a channel or create your own to start a conversation!
        </p>
      </div>

      <div className="flex justify-between bg-white p-3 rounded-lg items-center">
        <ChannelTabs />

        <div className="flex font-bold cursor-pointer text-blue-600">
          Invites
        </div>
      </div>

      {children}
    </div>
  );
}
