"use client";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const BlockedUsers = () => {
  const [blockedUsers, setBlockedUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      blockedDate: "2025-03-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      blockedDate: "2025-02-28",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      blockedDate: "2025-01-15",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showUnblockModal, setShowUnblockModal] = useState(false);
  const [userToUnblock, setUserToUnblock] = useState<any>(null);

  const filteredUsers = blockedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUnblock = (user: any) => {
    setUserToUnblock(user);
    setShowUnblockModal(true);
  };

  const confirmUnblock = () => {
    setBlockedUsers(
      blockedUsers.filter((user) => user.id !== userToUnblock.id)
    );
    setShowUnblockModal(false);
    alert(`User ${userToUnblock.name} has been unblocked.`);
  };

  const cancelUnblock = () => {
    setShowUnblockModal(false);
  };

  return (
    <div className="mx-auto pb-6 bg-white space-y-6">
      <div>
        <h3 className="text-lg font-medium">Blocked Users</h3>
        <p className="text-sm text-muted-foreground">
          Blocked users won't be able to interact with you until you unblock
          them.
        </p>
      </div>
      <Separator />

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search blocked users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-600 border-b">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Date Blocked</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.blockedDate}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleUnblock(user)}
                      className="text-red-600 hover:text-red-700 focus:outline-none"
                    >
                      Unblock
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No blocked users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showUnblockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Unblock User
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to unblock{" "}
              <strong>{userToUnblock?.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelUnblock}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmUnblock}
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

export default BlockedUsers;
