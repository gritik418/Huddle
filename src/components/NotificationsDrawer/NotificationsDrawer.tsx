import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { JSX } from "react";
import { IoIosNotifications } from "react-icons/io";

const NotificationsDrawer = (): JSX.Element => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex bg-gray-100 relative cursor-pointer h-10 w-10 items-center justify-center rounded-full">
          <IoIosNotifications className="text-lg text-gray-700" />

          <span className="absolute h-2 w-2 bg-red-400 rounded-full right-1 top-1"></span>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            {/* <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" /> */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsDrawer;
