"use client";
import Navbar from "@/components/Navbar/Navbar";
import { selectUser } from "@/features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname: string = usePathname();
  const user: User | null = useSelector(selectUser);

  return (
    <div className="flex flex-col bg-gray-100">
      <Navbar />

      {pathname === "/profile/edit" ? (
        <div className="p-3 mt-4">{children}</div>
      ) : (
        <div className="p-3 mt-4">
          <div className="flex p-3 flex-col bg-white rounded-lg">
            <div className="relative">
              <Image
                src={
                  user?.coverImage ||
                  "https://images.unsplash.com/photo-1615196534055-7aa534f6836b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvdmVyJTIwcGhvdG98ZW58MHx8MHx8fDA%3D"
                }
                alt="cover-image"
                height={300}
                width={800}
                className="w-full max-h-[260px] object-cover rounded-lg"
              />
              <div className="flex overflow-hidden absolute left-1/2 -translate-x-1/2 md:translate-x-0 top-1/2 md:left-16 translate-y-1/3 rounded-full h-[180px] w-[180px] border-8 border-white">
                <Image
                  src={user?.profilePicture || "/images/default-profile.jpg"}
                  alt="profile"
                  height={120}
                  width={120}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row  md:items-center justify-between pt-44">
              <div className="flex flex-col gap-1">
                <p className="text-3xl font-semibold">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xl text-gray-500 font-medium">
                  @{user?.username}
                </p>
              </div>

              <div className="flex mt-8 md:mt-4 space-x-6">
                <Link
                  href={"/profile/posts"}
                  className="flex flex-col items-center"
                >
                  <span className="font-semibold">{user?.posts.length}</span>
                  <p className="text-gray-500 text-sm">Posts</p>
                </Link>

                <Link
                  href={"/profile/followers"}
                  className="flex flex-col items-center"
                >
                  <span className="font-semibold">
                    {user?.followers.length}
                  </span>
                  <p className="text-gray-500 text-sm">Followers</p>
                </Link>

                <Link
                  href={"/profile/following"}
                  className="flex flex-col items-center"
                >
                  <span className="font-semibold">
                    {user?.following.length}
                  </span>
                  <p className="text-gray-500 text-sm">Following</p>
                </Link>
              </div>
            </div>

            {pathname !== "/profile/followers" &&
            pathname !== "/profile/following" ? (
              <div className="flex mt-8">
                <ul className="flex gap-2 sm:gap-3">
                  <li className="flex items-center justify-center w-max h-max">
                    <Link
                      className={`p-1 px-2 sm:px-4 rounded-full text-xs sm:text-lg ${
                        pathname === "/profile"
                          ? "bg-[var(--secondary)] text-white font-bold"
                          : "bg-gray-200"
                      }`}
                      href="/profile"
                    >
                      About
                    </Link>
                  </li>

                  <li className="flex items-center justify-center w-max h-max">
                    <Link
                      className={`p-1 px-2 sm:px-4 rounded-full text-xs sm:text-lg ${
                        pathname === "/profile/posts"
                          ? "bg-[var(--secondary)] text-white font-bold"
                          : "bg-gray-200"
                      }`}
                      href="/profile/posts"
                    >
                      Posts
                    </Link>
                  </li>

                  <li className="flex items-center justify-center w-max h-max">
                    <Link
                      className={`p-1 px-2 sm:px-4 rounded-full text-xs sm:text-lg ${
                        pathname === "/profile/channels"
                          ? "bg-[var(--secondary)] text-white font-bold"
                          : "bg-gray-200"
                      }`}
                      href="/profile/channels"
                    >
                      Channels
                    </Link>
                  </li>

                  <li className="flex items-center justify-center w-max h-max">
                    <Link
                      className={`p-1 px-2 sm:px-4 rounded-full text-xs sm:text-lg ${
                        pathname === "/profile/pulse"
                          ? "bg-[var(--secondary)] text-white font-bold"
                          : "bg-gray-200"
                      }`}
                      href="/profile/pulse"
                    >
                      Pulse
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex m-2"></div>
            )}
          </div>

          {children}
        </div>
      )}
    </div>
  );
}
