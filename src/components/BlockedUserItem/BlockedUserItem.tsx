"use client";
import Image from "next/image";
import { JSX, useState } from "react";

const BlockedUserItem = ({ user }: { user: Follower }): JSX.Element => {
  const [showUnblockModal, setShowUnblockModal] = useState<boolean>(false);

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

      <div className="flex hover:bg-[var(--secondary)] p-1 px-2 rounded-md font-medium cursor-pointer bg-[var(--primary)] transition-colors ease-in-out duration-300 text-white">
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
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                // onClick={confirmUnblock}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
              >
                Yes, Unblock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockedUserItem;
