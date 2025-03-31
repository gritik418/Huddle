"use client";
import Navbar from "../../../../components/Navbar/Navbar";
import { useState } from "react";

const followersData = [
  { id: "1", name: "John Doe", username: "john_doe" },
  { id: "2", name: "Jane Smith", username: "jane_smith" },
  { id: "3", name: "Alice Johnson", username: "alice_j" },
  { id: "4", name: "Bob Lee", username: "bob_lee" },
  { id: "5", name: "Charlie Brown", username: "charlie_brown" },
];

const FollowersPage = () => {
  const [followers] = useState(followersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [following, setFollowing] = useState(new Set());

  const handleFollow = (id: string) => {
    const newFollowing = new Set(following);
    if (newFollowing.has(id)) {
      newFollowing.delete(id);
    } else {
      newFollowing.add(id);
    }
    setFollowing(newFollowing);
  };

  const filteredFollowers = followers.filter((follower) =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Followers</h1>

        <div className="mb-6">
          <input
            type="text"
            className="w-full p-2 border bg-gray-50 border-gray-300 rounded-lg"
            placeholder="Search followers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredFollowers.map((follower) => (
            <div
              key={follower.id}
              className="flex items-center justify-between p-4 border-b border-gray-300 rounded-lg"
            >
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-white mr-4">
                  {follower.name[0]}
                </div>
                <div>
                  <p className="font-semibold">{follower.name}</p>
                  <p className="text-sm text-gray-500">@{follower.username}</p>
                </div>
              </div>

              <button
                onClick={() => handleFollow(follower.id)}
                className={`${
                  following.has(follower.id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } px-4 py-2 rounded-lg`}
              >
                {following.has(follower.id) ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full">
            Load More
          </button>
        </div>
      </div>
    </>
  );
};

export default FollowersPage;
