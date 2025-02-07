"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";
import { IoChatbubblesSharp, IoHome } from "react-icons/io5";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { BsBellFill } from "react-icons/bs";

const Navbar = (): JSX.Element => {
  const pathname: string = usePathname();

  return (
    <nav className="shadow-lg sticky top-0 h-14 px-4 z-50">
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
              className={`${pathname === "/" ? "text-[var(--secondary)]" : ""}`}
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
                pathname.startsWith("/chat") ? "text-[var(--secondary)]" : ""
              }`}
            >
              <Link
                href={"/chat"}
                className="flex gap-1 items-center text-sm font-medium"
              >
                <IoChatbubblesSharp className="text-xl" /> Chats
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex bg-gray-200 relative cursor-pointer h-10 w-10 items-center justify-center rounded-full">
            <BsBellFill />

            <span className="absolute h-2 w-2 bg-red-400 rounded-full right-1 top-1"></span>
          </div>

          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
