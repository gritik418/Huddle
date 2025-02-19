import React, { JSX } from "react";
import PrivateAccount from "../PrivateAccount/PrivateAccount";

const UserPosts = (): JSX.Element => {
  return (
    <div className="min-h-56 rounded-lg shadow-md ring-offset-1 bg-gray-50 w-full">
      <PrivateAccount />
    </div>
  );
};

export default UserPosts;
