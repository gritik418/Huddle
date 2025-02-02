"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";

const Navbar = (): JSX.Element => {
  const pathname: string = usePathname();

  return (
    <nav className="shadow-md h-14 px-4">
      <div className="items-center h-full flex gap-8 justify-between">
        <div className="flex gap-8">
          <Link href={"/"}>
            <Image
              src={"/images/logo-horizontal.png"}
              alt="logo"
              height={100}
              width={150}
            />
          </Link>

          <ul className="flex items-center gap-4">
            <li
              className={`${
                pathname === "/" ? "text-[var(--secondary)] font-bold" : ""
              }`}
            >
              <Link
                href={"/"}
                className="flex gap-1 items-center text-sm font-medium"
              >
                <IoHome className="text-xl" /> Home
              </Link>
            </li>

            <li
              className={`${
                pathname.startsWith("/chat")
                  ? "text-[var(--secondary)] font-bold"
                  : ""
              }`}
            >
              <Link
                href={"/chat"}
                className="flex gap-1 items-center text-sm font-medium"
              >
                <HiChatBubbleBottomCenterText className="text-xl" /> Chats
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex gap-2 bg-gray-200 pl-4 p-1 rounded-full">
          <div className="flex flex-col justify-center items-start">
            <p className="text-sm font-normal">John Doe</p>
            <p className="text-xs">@johndoe</p>
          </div>
          <div className="h-10 w-10 rounded-full">
            <Image
              src={
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt="avatar"
              height={40}
              width={40}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
