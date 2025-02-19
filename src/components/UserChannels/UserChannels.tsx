import React, { JSX } from "react";

const UserChannels = (): JSX.Element => {
  return (
    <div className="min-h-56 flex-col flex items-center justify-center rounded-lg shadow-md ring-offset-1 bg-gray-50 w-full">
      <p>This user hasn’t created any channels yet.</p>
      <p>Check back later for updates!</p>
    </div>
  );
};

export default UserChannels;
