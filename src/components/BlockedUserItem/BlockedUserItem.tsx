"use client";
import Image from "next/image";
import { JSX, useState } from "react";
import Spinner from "@/components/Spinner/Spinner";
import { useUnblockUserMutation } from "@/features/api/blockUserApi";
import { Bounce, toast } from "react-toastify";

const BlockedUserItem = ({ user }: { user: Follower }): JSX.Element => {
  const [showUnblockModal, setShowUnblockModal] = useState<boolean>(false);
  const [unblock] = useUnblockUserMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleUnblock = async () => {
    try {
      setLoading(true);
      await unblock(user._id);
      setLoading(false);
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
    <div className="flex bg-gray-100 w-full p-2 justify-between items-center rounded-lg">
      <div className="flex items-center gap-2">
        <div className="flex h-16 w-16 rounded-full">
          <Image
            className="h-full w-full rounded-full"
            // src={user.profilePicture || "/images/default-profile.jpg"}
            src={"/images/default-profile.jpg"}
            alt="avatar"
            height={50}
            width={50}
          />
        </div>

        <div className="flex flex-col">
          <p>
            {user.firstName} {user?.lastName}
          </p>
          <p className="text-gray-500 text-sm font-semibold">
            @{user.username}
          </p>
        </div>
      </div>

      <div
        onClick={() => setShowUnblockModal(true)}
        className="flex p-2 hover:bg-[var(--secondary)] items-center justify-center rounded-md font-medium cursor-pointer bg-[var(--primary)] transition-colors ease-in-out duration-300 text-white"
      >
        Unblock
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
                {user?.firstName} {user?.lastName}
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
                {loading ? <Spinner variant={null} /> : "Yes, Unblock"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockedUserItem;
