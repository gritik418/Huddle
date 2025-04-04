"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "../../lib/utils";
import { buttonVariants } from "../ui/button";
import { JSX } from "react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SettingsSidebar({
  className,
  items,
  ...props
}: SidebarNavProps): JSX.Element {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 w-full lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-gray-200 hover:bg-gray-200"
              : "hover:bg-gray-50",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
