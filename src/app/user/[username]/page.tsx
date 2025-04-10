"use client";
import { Menu, Portal } from "@chakra-ui/react";
import { AppDispatch } from "../../../app/store";
import Navbar from "../../../components/Navbar/Navbar";
import PrivateAccount from "../../../components/PrivateAccount/PrivateAccount";
import Spinner from "../../../components/Spinner/Spinner";
import UserChannels from "../../../components/UserChannels/UserChannels";
import UserPosts from "../../../components/UserPosts/UserPosts";
import {
  SendFollowRequestApiResponse,
  useSendFollowRequestMutation,
} from "../../../features/api/followRequestApi";
import {
  useGetUserByUsernameQuery,
  useUnfollowMutation,
} from "../../../features/api/userApi";
import {
  addToBlockedUsers,
  addToFollowings,
  removeFromBlockedUsers,
  removeFromFollowing,
  selectBlockedUserIds,
  selectUser,
} from "../../../features/user/userSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { JSX, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  useBlockUserMutation,
  useUnblockUserMutation,
} from "../../../features/api/blockUserApi";

const UserInfo = (): JSX.Element => {
  const params: { username: string } = useParams();
  const user: User | null = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState<"posts" | "channels">("posts");
  const [sendFollowRequest] = useSendFollowRequestMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [unblockLoading, setUnblockLoading] = useState<boolean>(false);
  const [unfollowLoading, setUnfollowLoading] = useState<boolean>(false);
  const [unfollow] = useUnfollowMutation();
  const [blockUser] = useBlockUserMutation();
  const { username } = params;
  const { data, isLoading, error } = useGetUserByUsernameQuery(username);
  const userId: string | undefined = data?.user?._id;
  const dispatch = useDispatch<AppDispatch>();
  const blockedUserIds = useSelector(selectBlockedUserIds);
  const [showUnblockModal, setShowUnblockModal] = useState<boolean>(false);
  const [unblock] = useUnblockUserMutation();

  if (isLoading) {
    return (
      <div className="flex items-center h-screen justify-center flex-1">
        <Spinner variant="medium" />
      </div>
    );
  }

  if (!data || !data.user || !userId || error) {
    return (
      <div className="h-screen">
        <Navbar />
        <div className="p-3 flex flex-col h-[calc(100%-56px)] items-center justify-center">
          <Image
            src={"/images/no-user.jpg"}
            alt="no-user"
            height={210}
            width={210}
          />
          <p className="text-center text-lg text-gray-600 max-w-[600px]">
            Oops! We couldn&apos;t find the user you&apos;re looking for. Maybe
            the username is misspelled or the user is no longer active. Please
            check again or try another username.
          </p>
        </div>
      </div>
    );
  }

  const handleSendFollowRequest = async () => {
    try {
      setLoading(true);
      const { data, error } = await sendFollowRequest(userId);
      setLoading(false);
      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as SendFollowRequestApiResponse;

        if (parsedError?.message) {
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
        } else {
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
      } else {
        if (data.success) {
          if (data.followingId) {
            dispatch(addToFollowings(data.followingId));
          }
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
        } else {
          toast.error(data.message, {
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

  const handleUnfollow = async (): Promise<void> => {
    if (!data.user?._id) return;
    setUnfollowLoading(true);
    const { data: res } = await unfollow(data.user._id);
    setUnfollowLoading(false);
    if (res) {
      if (res.success) {
        dispatch(removeFromFollowing(data.user._id));
      }
    }
  };

  const handleBlock = async (): Promise<void> => {
    if (!data.user?._id) return;
    const { data: res } = await blockUser(data.user._id);
    if (res?.success) {
      dispatch(addToBlockedUsers(data.user._id));
    }
  };

  const handleUnblock = async () => {
    if (!data.user?._id) return;
    try {
      setUnblockLoading(true);
      const { data: res } = await unblock(data.user._id);
      if (res?.success) {
        dispatch(removeFromBlockedUsers(data.user._id));
      }
      setUnblockLoading(false);
      setShowUnblockModal(false);
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

  if (data.user && data.user._id.toString() === user?._id.toString()) {
    redirect("/profile");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-3 mt-4 flex flex-col gap-4">
        <div className="flex justify-center bg-white flex-col p-3 rounded-lg">
          <div className="flex relative">
            <Image
              src={data.user?.coverImage || "/images/default-cover-image.jpg"}
              alt="cover-image"
              height={300}
              width={1000}
              className="max-h-[300px] h-full w-full object-cover rounded-lg"
            />
            <div className="flex-shrink-0 rounded-full absolute bottom-0 left-16 translate-y-1/2 h-[180px] w-[180px] border-4 border-white">
              <Image
                src={
                  data?.user?.profilePicture || "/images/default-profile.jpg"
                }
                alt="avatar"
                height={200}
                width={200}
                className="rounded-full h-full w-full"
              />
            </div>

            <div className="flex">
              <Menu.Root>
                <Menu.Trigger asChild>
                  <div className="flex bg-gray-50 cursor-pointer p-[5px] rounded-lg absolute top-3 right-3">
                    <BsThreeDotsVertical />
                  </div>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      {blockedUserIds.includes(data.user._id) ? (
                        <Menu.Item onClick={handleUnblock} value="new-txt-a">
                          Unblock User
                        </Menu.Item>
                      ) : (
                        <Menu.Item onClick={handleBlock} value="new-txt-a">
                          Block User
                        </Menu.Item>
                      )}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </div>
          </div>

          <div className="flex justify-between items-center mt-36 mb-6">
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
            {blockedUserIds.includes(data.user._id) ? (
              <div
                onClick={() => setShowUnblockModal(true)}
                className="flex p-2 hover:bg-[var(--secondary)] items-center justify-center rounded-md font-medium cursor-pointer bg-[var(--primary)] transition-colors ease-in-out duration-300 text-white"
              >
                Unblock
              </div>
            ) : (
              <>
                {user?.following.includes(data.user._id.toString()) ? (
                  <button
                    onClick={handleUnfollow}
                    className="flex w-32 h-10 items-center justify-center text-[var(--secondary)] rounded-lg font-bold text-xl bg-gray-200"
                  >
                    {unfollowLoading ? <Spinner variant={"xs"} /> : "Unfollow"}
                  </button>
                ) : (
                  <>
                    {user?.followers.includes(data.user._id.toString()) ? (
                      <button
                        disabled={loading}
                        onClick={handleSendFollowRequest}
                        className="flex w-36 h-10 items-center justify-center bg-[var(--secondary)] rounded-lg font-bold text-xl text-white"
                      >
                        {loading ? <Spinner variant={null} /> : "Follow Back"}
                      </button>
                    ) : (
                      <button
                        disabled={loading}
                        onClick={handleSendFollowRequest}
                        className="flex w-24 items-center justify-center h-10 bg-[var(--secondary)] rounded-lg font-bold text-xl text-white"
                      >
                        {loading ? <Spinner variant={null} /> : "Follow"}
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {!blockedUserIds.includes(data.user._id) && (
          <div className="flex flex-col bg-white p-3 rounded-lg">
            <div className="flex">
              <ul className="flex items-center w-full gap-4">
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

            <div className="flex mt-4">
              {activeTab === "posts" ? (
                <>
                  {data.user?.isPrivate &&
                  !user?.following.includes(data.user._id) ? (
                    <PrivateAccount />
                  ) : (
                    <UserPosts user={data.user} />
                  )}
                </>
              ) : (
                <UserChannels />
              )}
            </div>
          </div>
        )}
      </div>

      {showUnblockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Unblock User
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to unblock{" "}
              <strong>
                {data.user?.firstName} {data.user?.lastName}
              </strong>
              ?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowUnblockModal(false)}
                className="bg-gray-300 text-gray-700 h-10 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUnblock}
                className="bg-red-600 hover:bg-red-700 w-32 text-white h-10 rounded-md flex items-center justify-center"
              >
                {unblockLoading ? <Spinner variant={null} /> : "Yes, Unblock"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
