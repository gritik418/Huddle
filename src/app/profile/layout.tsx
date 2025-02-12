"use client";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname: string = usePathname();

  const user = {
    name: "Ritik Gupta",
    username: "@ritik_",
    bio: "Web developer | Tech enthusiast | Love coding and design 🌐",
    email: "ritik@domain.com",
    followers: 1200,
    following: 400,
    posts: 250,
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <Navbar />

      <div className="p-3 mt-4">
        <div className="flex p-3 flex-col bg-white rounded-lg">
          <div className="relative">
            <Image
              src={
                "https://images.unsplash.com/photo-1615196534055-7aa534f6836b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvdmVyJTIwcGhvdG98ZW58MHx8MHx8fDA%3D"
              }
              alt="cover-image"
              height={300}
              width={800}
              className="w-full max-h-[260px] rounded-lg"
            />
            <div className="flex overflow-hidden absolute top-1/2 left-16 translate-y-1/3 rounded-full h-[180px] w-[180px] border-8 border-white">
              <Image
                src={"/images/default-profile.jpg"}
                alt="profile"
                height={200}
                width={200}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-24">
            <div className="flex flex-col">
              <p className="text-3xl font-semibold">{user.name}</p>
              <p className="text-xl text-gray-500 font-medium">
                {user.username}
              </p>
            </div>

            <div className="flex mt-4 space-x-6">
              <div className="flex flex-col items-center">
                <span className="font-semibold">{user.posts}</span>
                <p className="text-gray-500 text-sm">Posts</p>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-semibold">{user.followers}</span>
                <p className="text-gray-500 text-sm">Followers</p>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-semibold">{user.following}</span>
                <p className="text-gray-500 text-sm">Following</p>
              </div>
            </div>
          </div>

          <div className="flex mt-8">
            <ul className="flex gap-3">
              <li className="flex items-center justify-center w-max h-max">
                <Link
                  className={`p-1 px-4 rounded-full ${
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
                  className={`p-1 px-4 rounded-full ${
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
                  className={`p-1 px-4 rounded-full ${
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
                  className={`p-1 px-4 rounded-full ${
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
        </div>

        {children}
      </div>
    </div>
  );
}
