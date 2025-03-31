import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";
import { FaBroadcastTower, FaHamburger, FaUserFriends } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";
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
      <DrawerContent className="bg-white">
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
                  <IoHome className="text-lg" /> Home
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
                  <IoChatbubblesSharp className="text-lg" /> Chats
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
                  href={"/explore/accounts"}
                  className="flex gap-2 items-center text-xl font-medium"
                >
                  <HiMiniMagnifyingGlass className="text-lg" /> Explore
                </Link>
              </li>

              <li
                className={`${
                  pathname.startsWith("/pulse") ? "text-[var(--secondary)]" : ""
                }`}
              >
                <Link
                  href={"/pulse"}
                  className="flex gap-2 items-center text-xl font-medium"
                >
                  <HiLightningBolt className="text-lg" /> Pulse
                </Link>
              </li>

              <li
                className={`${
                  pathname.startsWith("/buddies")
                    ? "text-[var(--secondary)]"
                    : ""
                }`}
              >
                <Link
                  href={"/buddies"}
                  className="flex gap-2 items-center text-xl font-medium"
                >
                  <FaUserFriends className="text-lg" /> Buddies
                </Link>
              </li>

              <li
                className={`${
                  pathname.startsWith("/channels")
                    ? "text-[var(--secondary)]"
                    : ""
                }`}
              >
                <Link
                  href={"/channels"}
                  className="flex gap-2 items-center text-xl font-medium"
                >
                  <FaBroadcastTower className="text-lg" /> Channels
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
