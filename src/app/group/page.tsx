"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

// This is a sample function that you can replace with your actual API call
const fetchGroups = async () => {
  // Replace with actual API call
  return [
    { id: "1", name: "Friends", description: "A group for close friends" },
    { id: "2", name: "Work", description: "Work-related discussions" },
    { id: "3", name: "Travel", description: "Planning our next vacation" },
  ];
};

const GroupsPage = () => {
  const [groups, setGroups] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetching groups when the component mounts
  useEffect(() => {
    const getGroups = async () => {
      try {
        const groupData = await fetchGroups();
        setGroups(groupData);
      } catch (err) {
        setError("Failed to fetch groups. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getGroups();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Groups</h1>

      {/* Create New Group Button */}
      <div className="flex justify-end mb-6">
        <Link href="/group/create">
          <button className="px-6 py-3 bg-[var(--secondary)] font-semibold text-white rounded-lg transition duration-200">
            Create New Group
          </button>
        </Link>
      </div>

      {/* Groups List */}
      <div className="flex gap-6">
        {groups.length > 0 ? (
          groups.map((group: any) => (
            <div
              key={group.id}
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {group.name}
              </h2>
              <p className="text-gray-600 mt-2">{group.description}</p>

              {/* Join Group Button */}
              <div className="mt-4">
                <Link href={`/group/[groupId]`} as={`/groups/${group.id}`}>
                  <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
                    Join Group
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="flex w-full mt-4 items-center justify-center">
            <p className="text-center text-gray-500">
              No groups available. Join or create a new group!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default GroupsPage;
