"use client";
import { JSX } from "react";

const Profile = (): JSX.Element => {
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
    <div className="bg-white rounded-lg p-3 mt-4 mb-6">
      <div className="mt-4">
        <h3 className="text-2xl font-semibold">About</h3>
        <p className="text-lg text-gray-600 mt-2">{user.bio}</p>

        <div className="mt-4">
          <h3 className="text-2xl font-semibold">Contact</h3>
          <p className="text-lg text-gray-600 mt-2">{user.email}</p>
        </div>
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
