import Navbar from "@/components/Navbar/Navbar";
import { SettingsSidebar } from "@/components/SettingsSidebar/SettingsSidebar";
import { Separator } from "@/components/ui/separator";
import SettingsOptionsMenu from "@/components/SettingsOptionsMenu/SettingsOptionsMenu";

export type NavItems = {
  title: string;
  href: string;
};

const sidebarNavItems: NavItems[] = [
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
      <div className="space-y-6 p-3 py-10 md:p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <div className="flex mb-3 items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>

            <SettingsOptionsMenu items={sidebarNavItems} />
          </div>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 gap-8 lg:flex-row lg:space-x-4 lg:space-y-0">
          <aside className="-mx-4 hidden lg:flex lg:w-1/5">
            <SettingsSidebar items={sidebarNavItems} />
          </aside>

          <div className="flex-1 w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
