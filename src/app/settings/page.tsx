"use client";
import { Separator } from "@/components/ui/separator";
import {
  useToggleAccountPrivacyMutation,
  useToggleActiveStatusVisibilityMutation,
} from "@/features/api/accountSettingsApi";
import {
  selectUser,
  toggleActiveStatus,
  togglePrivacy,
} from "@/features/user/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
import { AppDispatch } from "../store";

const PrivacySettings = () => {
  const user: User | null = useSelector(selectUser);
  const [allowMentions, setAllowMentions] = useState(true);
  const [toggleAccountPrivacy] = useToggleAccountPrivacyMutation();
  const [toggleActiveStatusVisibility] =
    useToggleActiveStatusVisibilityMutation();
  const dispatch = useDispatch<AppDispatch>();

  const handleTogglePrivateAccount = async () => {
    const value = !user?.isPrivate ? "private" : "public";
    try {
      const { data } = await toggleAccountPrivacy(value);
      if (data) {
        dispatch(togglePrivacy({ privacy: value }));
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error.", {
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

  const handleToggleActiveStatus = async () => {
    try {
      const { data } = await toggleActiveStatusVisibility(
        !user?.showActiveStatus
      );
      if (data) {
        dispatch(toggleActiveStatus(!user?.showActiveStatus));
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error.", {
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

  const handleToggleAllowMentions = () => {
    setAllowMentions((prevState) => !prevState);
  };

  return (
    <div className="mx-auto pb-8 bg-white space-y-6">
      <div>
        <h3 className="text-lg font-medium">Privacy</h3>
        <p className="text-sm text-muted-foreground">
          Toggle this option to make your account private. When enabled, only
          approved followers can see your posts.
        </p>
      </div>
      <Separator />

      <div className="bg-gray-50 shadow rounded-lg p-6 my-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          Private Account
        </h2>
        <p className="text-gray-600 mb-6">
          Toggle this option to make your account private. When enabled, only
          approved followers can see your posts.
        </p>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Private Account</span>
          <button
            onClick={handleTogglePrivateAccount}
            className={`${
              user?.isPrivate ? "bg-green-600" : "bg-gray-300"
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${
                user?.isPrivate ? "translate-x-5" : "translate-x-0"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            ></span>
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          {user?.isPrivate
            ? "Your account is private. Only approved followers can see your posts."
            : "Your account is public. Anyone can view your posts."}
        </p>
      </div>

      <div className="bg-gray-50 shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          Active Status
        </h2>
        <p className="text-gray-600 mb-6">
          Toggle this option to control whether other users can see if
          you&apos;re currently active.
        </p>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Show Active Status</span>
          <button
            onClick={handleToggleActiveStatus}
            className={`${
              user?.showActiveStatus ? "bg-green-600" : "bg-gray-300"
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${
                user?.showActiveStatus ? "translate-x-5" : "translate-x-0"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            ></span>
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          {user?.showActiveStatus
            ? "Other users can see when you're online."
            : "Your active status is hidden."}
        </p>
      </div>

      <div className="bg-gray-50 shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          Allow Mentions
        </h2>
        <p className="text-gray-600 mb-6">
          Toggle this option to allow or disallow other users from mentioning
          you in their posts or comments.
        </p>

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
