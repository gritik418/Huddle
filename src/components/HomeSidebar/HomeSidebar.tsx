"use client";
import { selectUser } from "../../features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";
import { FaBroadcastTower, FaStream, FaUserFriends } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useSelector } from "react-redux";

const HomeSidebar = (): JSX.Element => {
  const pathname: string = usePathname();
  const user: User | null = useSelector(selectUser);

  return (
    <div className="hidden w-[300px] md:flex flex-col p-3 gap-3">
      <div className="flex flex-col bg-white rounded-lg p-2 py-6 items-center">
        <div className="flex h-24 w-24">
          <Image
            src={user?.profilePicture || "/images/default-profile.jpg"}
            alt="avatar"
            height={80}
            width={80}
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        <p className="text-sm font-semibold mt-2 mb-3">
          {user?.firstName} {user?.lastName}
        </p>

        <div className="flex justify-evenly w-full">
          <Link
            href={"/profile/following"}
            className="flex flex-col items-center text-gray-600"
          >
            <p className="text-xs font-bold">Following</p>
            <p className="font-semibold text-xs">{user?.following.length}</p>
          </Link>

          <div className="min-h-full border-[1px] border-gray-300"></div>

          <Link
            href={"/profile/followers"}
            className="flex flex-col items-center text-gray-600"
          >
            <p className="text-xs font-bold">Followers</p>
            <p className="font-semibold text-xs">{user?.followers.length}</p>
          </Link>
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
          href={"/explore/accounts"}
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
      </div>
    </div>
  );
};

export default HomeSidebar;
