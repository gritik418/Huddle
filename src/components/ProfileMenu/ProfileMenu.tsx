import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";

const ProfileMenu = (): JSX.Element => {
  return (
    <Menubar asChild className="bg-none outline-none border-none">
      <MenubarMenu>
        <MenubarTrigger
          asChild
          className="p-0 bg-none rounded-xl cursor-pointer"
        >
          <div className="h-10 w-10 rounded-xl">
            <Image
              src={
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt="avatar"
              height={40}
              width={40}
              className="h-full w-full rounded-xl object-cover"
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
