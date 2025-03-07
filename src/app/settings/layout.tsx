import Image from "next/image";

import Navbar from "@/components/Navbar/Navbar";
import { SettingsSidebar } from "@/components/SettingsSidebar/SettingsSidebar";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
  {
    title: "Privacy",
    href: "/settings",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Blocked Users",
    href: "/settings/blocked-users",
  },
  {
    title: "Account Management",
    href: "/settings/account-management",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SettingsSidebar items={sidebarNavItems} />
          </aside>
          <div className="flex-1 w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
