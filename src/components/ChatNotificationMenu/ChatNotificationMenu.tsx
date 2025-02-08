import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";
import { IoIosNotifications } from "react-icons/io";

const ChatNotificationMenu = () => {
  return (
    <Menubar className="p-0 border-none">
      <MenubarMenu>
        <MenubarTrigger
          asChild
          className="cursor-pointer border-none outline-none bg-none rounded-full"
        >
          <div className="relative flex min-h-10 h-10 w-10 min-w-10 rounded-full items-center justify-center bg-gray-100">
            <IoIosNotifications />
            <span className="absolute h-2 w-2 bg-red-400 rounded-full top-1 right-1"></span>
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ChatNotificationMenu;
