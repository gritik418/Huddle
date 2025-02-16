import { selectUser } from "@/features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { useSelector } from "react-redux";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";

const ProfileMenu = (): JSX.Element => {
  const user: User | null = useSelector(selectUser);

  return (
    <Menubar asChild className="bg-none outline-none border-none">
      <MenubarMenu>
        <MenubarTrigger
          asChild
          className="p-0 bg-none rounded-xl cursor-pointer"
        >
          <div className="h-10 w-10 rounded-xl">
            <Image
              src={user?.profilePicture || "/images/default-profile.jpg"}
              alt="avatar"
              height={50}
              width={50}
              className="h-full w-full rounded-xl object-contain"
            />
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <Link href={"/profile"}>
            <MenubarItem className="cursor-pointer gap-2">
              <FaUser /> Profile
            </MenubarItem>
          </Link>
          <MenubarItem className="cursor-pointer gap-2">
            <IoMdSettings /> Settings
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="cursor-pointer gap-2">
            <FiLogOut /> Logout
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ProfileMenu;
