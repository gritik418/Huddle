import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";
import { FaHamburger } from "react-icons/fa";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoChatbubblesSharp, IoHome } from "react-icons/io5";

const NavigationDrawer = (): JSX.Element => {
  const pathname: string = usePathname();

  return (
    <DrawerRoot placement={"start"}>
      <DrawerBackdrop />
      <DrawerTrigger asChild className="flex md:hidden">
        <div className="flex bg-gray-200 p-2 rounded-lg cursor-pointer">
          <FaHamburger className="text-xl" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader>
          <DrawerTitle>
            <Link href={"/"}>
              <Image
                src={"/images/logo-horizontal.png"}
                alt="logo"
                height={100}
                width={150}
              />
            </Link>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="px-6 p-3 mt-3">
          <div className="flex">
            <ul className="flex flex-col gap-2">
              <li
                className={`${
                  pathname === "/" ? "text-[var(--secondary)]" : ""
                }`}
              >
                <Link
                  href={"/"}
                  className="flex gap-2 items-center text-xl font-medium"
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
                  className="flex gap-2 items-center text-xl font-medium"
                >
                  <IoChatbubblesSharp className="text-xl" /> Chats
                </Link>
              </li>

              <li
                className={`${
                  pathname.startsWith("/explore")
                    ? "text-[var(--secondary)]"
                    : ""
                }`}
              >
                <Link
                  href={"/explore"}
                  className="flex gap-2 items-center text-xl font-medium"
                >
                  <HiMiniMagnifyingGlass className="text-xl" /> Explore
                </Link>
              </li>
            </ul>
          </div>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default NavigationDrawer;
