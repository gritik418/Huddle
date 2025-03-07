"use client";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const PrivacySettings = () => {
  const [isPrivateAccount, setIsPrivateAccount] = useState(false);
  const [isActiveStatus, setIsActiveStatus] = useState(true);
  const [allowMentions, setAllowMentions] = useState(true);

  const handleTogglePrivateAccount = () => {
    setIsPrivateAccount((prevState) => !prevState);
  };

  const handleToggleActiveStatus = () => {
    setIsActiveStatus((prevState) => !prevState);
  };

  const handleToggleAllowMentions = () => {
    setAllowMentions((prevState) => !prevState);
  };

  return (
    <div className="mx-auto p-8 bg-white">
      <div>
        <h3 className="text-lg font-medium">Privacy</h3>
        <p className="text-gray-600 mb-6">
          Toggle this option to make your account private. When enabled, only
          approved followers can see your posts.
        </p>
      </div>
      <Separator />

      {/* Private Account Section */}
      <div className="bg-gray-50 shadow rounded-lg p-6 my-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          Private Account
        </h2>
        <p className="text-gray-600 mb-6">
          Toggle this option to make your account private. When enabled, only
          approved followers can see your posts.
        </p>

        {/* Toggle Switch */}
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Private Account</span>
          <button
            onClick={handleTogglePrivateAccount}
            className={`${
              isPrivateAccount ? "bg-green-600" : "bg-gray-300"
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${
                isPrivateAccount ? "translate-x-5" : "translate-x-0"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            ></span>
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          {isPrivateAccount
            ? "Your account is private. Only approved followers can see your posts."
            : "Your account is public. Anyone can view your posts."}
        </p>
      </div>

      {/* Active Status Section */}
      <div className="bg-gray-50 shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          Active Status
        </h2>
        <p className="text-gray-600 mb-6">
          Toggle this option to control whether other users can see if you're
          currently active.
        </p>

        {/* Toggle Switch */}
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Show Active Status</span>
          <button
            onClick={handleToggleActiveStatus}
            className={`${
              isActiveStatus ? "bg-green-600" : "bg-gray-300"
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${
                isActiveStatus ? "translate-x-5" : "translate-x-0"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            ></span>
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          {isActiveStatus
            ? "Other users can see when you're online."
            : "Your active status is hidden."}
        </p>
      </div>

      {/* Allow Mentions Section */}
      <div className="bg-gray-50 shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          Allow Mentions
        </h2>
        <p className="text-gray-600 mb-6">
          Toggle this option to allow or disallow other users from mentioning
          you in their posts or comments.
        </p>

        {/* Toggle Switch */}
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Allow Mentions</span>
          <button
            onClick={handleToggleAllowMentions}
            className={`${
              allowMentions ? "bg-green-600" : "bg-gray-300"
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${
                allowMentions ? "translate-x-5" : "translate-x-0"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            ></span>
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          {allowMentions
            ? "Other users can mention you in their posts and comments."
            : "You cannot be mentioned by other users."}
        </p>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button
          onClick={() => alert("Settings Saved!")}
          className="bg-[var(--secondary)] text-white py-2 px-4 rounded-md transition duration-150"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;
