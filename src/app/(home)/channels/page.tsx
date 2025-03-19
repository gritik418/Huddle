"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Assuming you are using Next.js for routing

const Channels = () => {
  // Sample channels data
  const [channels, setChannels] = useState([
    {
      id: 1,
      name: "Tech Talk",
      description: "Discuss the latest in tech!",
      members: 120,
    },
    {
      id: 2,
      name: "Gaming World",
      description: "Join for daily gaming discussions.",
      members: 150,
    },
    {
      id: 3,
      name: "Music Lovers",
      description: "Share and discover music.",
      members: 80,
    },
    {
      id: 4,
      name: "Travel Adventures",
      description: "Talk about your favorite destinations.",
      members: 65,
    },
  ]);

  // Search state to manage the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize router for navigation
  const router = useRouter();

  // Handle navigating to the "Create Channel" page
  const handleCreateChannelPage = () => {
    router.push("/create-channel"); // Navigate to the create channel page (you can update this to match your routing logic)
  };

  // Filter channels based on the search query
  const filteredChannels = channels.filter(
    (channel) =>
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px-16px-24px)] w-full gap-3">
      {/* Header */}
      <div className="bg-gradient-to-r rounded-lg from-blue-400 to-purple-500 text-white text-center p-6">
        <h1 className="text-3xl font-bold">Channels</h1>
        <p className="mt-2 text-sm font-semibold">
          Join a channel or create your own to start a conversation!
        </p>
      </div>

      <div className="w-full bg-white flex flex-col p-3 rounded-lg">
        {/* Channel List Section */}
        <div className="mx-auto w-full p-6 items-center">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Browse Channels</h2>

            {/* Full-Width Search Input */}
            <div className="text-center">
              <button
                onClick={handleCreateChannelPage}
                className="bg-[var(--secondary)] text-white px-6 py-3 rounded-md hover:bg-green-600"
              >
                Create a New Channel
              </button>
            </div>
          </div>

          <div className="w-full my-6 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search Channels"
              className="border border-gray-300 outline-blue-400 p-4 rounded-md w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Displaying filtered channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChannels.length > 0 ? (
              filteredChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold">{channel.name}</h3>
                  <p className="text-sm text-gray-600">{channel.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {channel.members} members
                    </span>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                      Join
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No channels found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
