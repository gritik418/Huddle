"use client";
import { useState } from "react";

const AccountManagement = () => {
  const [isDeactivated, setIsDeactivated] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeactivate = () => {
    setIsDeactivated(true);
    alert("Your account has been deactivated.");
  };

  const handleDelete = () => {
    alert("Your account has been permanently deleted.");
  };

  return (
    <div className="mx-auto p-8 bg-white">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-10">
        Account Management
      </h1>

      {/* Deactivate Account */}
      <div className="bg-gray-50 shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          Deactivate Account
        </h2>
        <p className="text-gray-600 mb-6">
          Temporarily deactivate your account. You can reactivate it by logging
          in anytime.
        </p>
        <button
          onClick={handleDeactivate}
          disabled={isDeactivated}
          className={`${
            isDeactivated
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
          } w-full py-3 px-4 rounded-md text-white font-semibold transition duration-150`}
        >
          {isDeactivated ? "Account Deactivated" : "Deactivate Account"}
        </button>
      </div>

      {/* Delete Account */}
      <div className="bg-gray-50 shadow rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          Delete Account
        </h2>
        <p className="text-gray-600 mb-6">
          Permanently delete your account. This action cannot be undone.
        </p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="w-full py-3 px-4 rounded-md bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-400 text-white font-semibold transition duration-150"
        >
          Delete Account
        </button>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Are you sure?
            </h3>
            <p className="text-gray-600 mb-8">
              This action will permanently delete your account and all data. It
              cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;
