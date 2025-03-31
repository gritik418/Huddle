"use client";
import { JSX } from "react";
import Link from "next/link";
import { FaHashtag } from "react-icons/fa";
import { GrChannel } from "react-icons/gr";
import { LuUser } from "react-icons/lu";
import { usePathname } from "next/navigation";

const ExploreTabs = (): JSX.Element => {
  const pathname = usePathname();
  return (
    <ul className="flex p-3 gap-5">
      <li>
        <Link
          href={"/explore/accounts"}
          className={`flex items-center text-xs p-2 gap-1 border-b-2 ${
            pathname === "/explore/accounts"
              ? "border-b-gray-400"
              : "border-b-white"
          }`}
        >
          <LuUser className="text-sm" />
          Accounts
        </Link>
      </li>

      <li>
        <Link
          href={"/explore/channels"}
          className={`flex items-center text-xs p-2 gap-1 border-b-2 ${
            pathname === "/explore/channels"
              ? "border-b-gray-400"
              : "border-b-white"
          }`}
        >
          <GrChannel className="text-sm" />
          Channels
        </Link>
      </li>

      <li>
        <Link
          href={"/explore/hashtags"}
          className={`flex items-center text-xs p-2 gap-1 border-b-2 ${
            pathname === "/explore/hashtags"
              ? "border-b-gray-400"
              : "border-b-white"
          }`}
        >
          <FaHashtag className="text-sm" />
          Hashtags
        </Link>
      </li>
    </ul>
  );
};

export default ExploreTabs;
