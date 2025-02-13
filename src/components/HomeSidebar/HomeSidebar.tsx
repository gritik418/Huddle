"use client";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FaStream, FaUserFriends } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { FaBroadcastTower } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";
import { FaPeopleGroup } from "react-icons/fa6";

const HomeSidebar = (): JSX.Element => {
  const pathname: string = usePathname();
  return (
    <div className="w-[300px] flex flex-col p-3 gap-3">
      <div className="flex flex-col bg-white rounded-lg p-2 py-6 items-center">
        <div className="flex h-20 w-20">
          <Image
            src={
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt="avatar"
            height={80}
            width={80}
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        <p className="text-sm font-semibold mt-1 mb-3">John Doe</p>

        <div className="flex justify-evenly w-full">
          <div className="flex flex-col items-center text-gray-600">
            <p className="text-xs font-bold">Following</p>
            <p className="font-semibold text-xs">120</p>
          </div>

          <div className="min-h-full border-[1px] border-gray-300"></div>

          <div className="flex flex-col items-center text-gray-600">
            <p className="text-xs font-bold">Followers</p>
            <p className="font-semibold text-xs">120</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white rounded-lg p-2 gap-2">
        <Link
          href={"/"}
          className={`flex items-center p-2 gap-2 rounded-lg ${
            pathname === "/" ? "bg-[var(--secondary)] text-white" : ""
          }`}
        >
          <FaStream className="text-lg" />
          <p className="text-sm font-bold">Feed</p>
        </Link>

        <Link
          href={"/explore"}
          className={`flex items-center p-2 gap-2 rounded-lg ${
            pathname.startsWith("/explore")
              ? "bg-[var(--secondary)] text-white"
              : ""
          }`}
        >
          <HiMiniMagnifyingGlass className="text-lg" />
          <p className="text-sm font-bold">Explore</p>
        </Link>

        <Link
          href={"/pulse"}
          className={`flex items-center p-2 gap-2 rounded-lg ${
            pathname.startsWith("/pulse")
              ? "bg-[var(--secondary)] text-white"
              : ""
          }`}
        >
          <HiLightningBolt className="text-lg" />
          <p className="text-sm font-bold">Pulse</p>
        </Link>

        <Link
          href={"/buddies"}
          className={`flex items-center p-2 gap-2 rounded-lg ${
            pathname.startsWith("/buddies")
              ? "bg-[var(--secondary)] text-white"
              : ""
          }`}
        >
          <FaUserFriends className="text-lg" />
          <p className="text-sm font-bold">Buddies</p>
        </Link>

        <Link
          href={"/channels"}
          className={`flex items-center p-2 gap-2 rounded-lg ${
            pathname.startsWith("/channels")
              ? "bg-[var(--secondary)] text-white"
              : ""
          }`}
        >
          <FaBroadcastTower className="text-lg" />
          <p className="text-sm font-bold">Channels</p>
        </Link>

        <Link
          href={"/communities"}
          className={`flex items-center p-2 gap-2 rounded-lg ${
            pathname.startsWith("/communities")
              ? "bg-[var(--secondary)] text-white"
              : ""
          }`}
        >
          <FaPeopleGroup className="text-lg" />
          <p className="text-sm font-bold">Communities</p>
        </Link>
      </div>
    </div>
  );
};

export default HomeSidebar;
