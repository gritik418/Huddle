"use client";
import Navbar from "@/components/Navbar/Navbar";
import Spinner from "@/components/Spinner/Spinner";
import { useGetUserByUsernameQuery } from "@/features/api/userApi";
import { selectUser } from "@/features/user/userSlice";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { JSX, useState } from "react";
import { useSelector } from "react-redux";

const UserInfo = (): JSX.Element => {
  const params: { username: string } = useParams();
  const user: User | null = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState<"posts" | "channels">("posts");

  if (!params) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Spinner variant="medium" />
      </div>
    );
  }

  const { username } = params;
  const { data, isLoading, error } = useGetUserByUsernameQuery(username);

  if (isLoading) {
    return (
      <div className="flex items-center h-screen justify-center flex-1">
        <Spinner variant="medium" />
      </div>
    );
  }

  if (!data?.user) {
    return (
      <div className="h-screen">
        <Navbar />
        <div className="p-3 flex flex-col h-[calc(100%-56px)] items-center justify-center">
          <Image
            src={"/images/no-user.jpg"}
            alt="no-user"
            height={300}
            width={300}
          />
          <p className="text-center text-lg text-gray-600 max-w-[600px]">
            Oops! We couldn't find the user you're looking for. Maybe the
            username is misspelled or the user is no longer active. Please check
            again or try another username.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-3 mt-4 flex flex-col gap-4">
        <div className="flex justify-center bg-white flex-col p-3 rounded-lg">
          <div className="flex relative">
            <Image
              src={
                "https://images.unsplash.com/photo-1516879175685-210bea8ad74d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvdmVyJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D"
              }
              alt="cover-image"
              height={300}
              width={1000}
              className="max-h-[300px] h-full w-full rounded-lg"
            />
            <div className="flex-shrink-0 absolute bottom-0 left-16 translate-y-1/2">
              <Image
                src={
                  data?.user?.profilePicture || "/images/default-profile.jpg"
                }
                alt="avatar"
                height={150}
                width={150}
                className="rounded-full"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-24 mb-6">
            <div className="flex flex-col">
              <p className="text-3xl font-semibold">
                {data.user.firstName} {data.user?.lastName}
              </p>

              <p className="text-xl font-semibold text-gray-500">
                @{data.user.username}
              </p>
            </div>

            <div className="flex mt-4 space-x-6">
              <div className="flex flex-col items-center">
                <span className="font-semibold">{data.user.posts.length}</span>
                <p className="text-gray-500 text-sm">Posts</p>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-semibold">
                  {data.user.followers.length}
                </span>
                <p className="text-gray-500 text-sm">Followers</p>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-semibold">
                  {data.user.following.length}
                </span>
                <p className="text-gray-500 text-sm">Following</p>
              </div>
            </div>
          </div>

          <div className="flex">
            <p className="max-w-[400px] mt-4 text-lg font-normal text-gray-500">
              {data.user?.bio}
            </p>
          </div>

          <div className="flex my-6 justify-end">
            {user?.following.includes(data.user._id.toString()) ? (
              <div className="flex cursor-pointer text-[var(--secondary)] p-2 rounded-lg px-6 font-bold text-xl bg-gray-100">
                Following
              </div>
            ) : (
              <div className="flex cursor-pointer bg-[var(--secondary)] p-2 rounded-lg px-6 font-bold text-xl text-white">
                Follow
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col bg-white h-[60vh] p-3 rounded-lg">
          <div className="flex">
            <ul className="flex p-3 items-center w-full gap-4">
              <li
                onClick={() => setActiveTab("posts")}
                className={`px-4 p-2 rounded-lg cursor-pointer ${
                  activeTab === "posts"
                    ? "bg-[var(--secondary)] text-white font-bold"
                    : "bg-gray-100"
                }`}
              >
                Posts
              </li>

              <li
                onClick={() => setActiveTab("channels")}
                className={`px-4 p-2 rounded-lg cursor-pointer ${
                  activeTab === "channels"
                    ? "bg-[var(--secondary)] text-white font-bold"
                    : "bg-gray-100"
                }`}
              >
                Channels
              </li>
            </ul>
          </div>

          <div className="flex mt-4 border-2"></div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
