import React from "react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavItems } from "@/app/settings/layout";
import Link from "next/link";

type PropsTypes = {
  items: NavItems[];
};

const SettingsOptionsMenu = ({ items }: PropsTypes) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <div className="flex lg:hidden bg-gray-200 rounded-md p-2">
          <RxHamburgerMenu className="text-lg" />
        </div>
      </MenuTrigger>
      <MenuContent>
        {items.map(({ href, title }) => (
          <Link key={href} href={href}>
            <MenuItem value="new-txt">{title}</MenuItem>
          </Link>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};

export default SettingsOptionsMenu;
