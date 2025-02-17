"use client";
import { selectUser } from "@/features/user/userSlice";
import { JSX } from "react";
import { useSelector } from "react-redux";

const Profile = (): JSX.Element => {
  const user: User | null = useSelector(selectUser);

  return (
    <div className="bg-white rounded-lg p-3 mt-4 mb-6">
      <div className="mt-4">
        <p className="text-lg text-gray-600 mt-2">{user?.bio}</p>
      </div>

      <div className="mt-4 flex justify-center">
        <button className="p-2 px-6 bg-[var(--secondary)] font-medium text-white rounded-full">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
