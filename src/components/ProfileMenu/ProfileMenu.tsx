import { clearUser, selectUser } from "../../features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";
import {
  LogoutResponse,
  useUserLogoutMutation,
} from "../../features/api/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AppDispatch } from "../../app/store";

const ProfileMenu = (): JSX.Element => {
  const user: User | null = useSelector(selectUser);
  const [userLogout] = useUserLogoutMutation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { data, error } = await userLogout();
      dispatch(clearUser());

      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as LogoutResponse;

        if (parsedError.message) {
          toast.error(parsedError.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          return;
        }
      }

      if (data?.success) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Some error occured.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

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
          <Link href={"/settings"}>
            <MenubarItem className="cursor-pointer gap-2">
              <IoMdSettings /> Settings
            </MenubarItem>
          </Link>
          <MenubarSeparator />
          <MenubarItem onClick={handleLogout} className="cursor-pointer gap-2">
            <FiLogOut /> Logout
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ProfileMenu;
