"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

type Tab = {
  name: string;
  link: string;
};

const tabItems: Tab[] = [
  {
    name: "All",
    link: "/channels",
  },
  {
    name: "Browse",

    link: "/channels/browse",
  },
  {
    name: "Joined",
    link: "/channels/joined",
  },
  {
    name: "Created",
    link: "/channels/created",
  },
];

const ChannelTabs = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <ul className="flex gap-1 sm:gap-3">
      {tabItems.map((tab: Tab) => (
        <Link
          key={tab.name}
          href={tab.link}
          className={`px-2 text-xs sm:text-lg sm:px-3 rounded-xl p-1 ${
            tab.link === pathname ? "bg-gray-300" : "bg-gray-100"
          }`}
        >
          <li>{tab.name}</li>
        </Link>
      ))}
    </ul>
  );
};

export default ChannelTabs;
