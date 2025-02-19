import AddPost from "@/components/AddPost/AddPost";
import React, { JSX } from "react";

const Posts = (): JSX.Element => {
  return (
    <div className="mb-20 flex flex-col">
      <div className="bg-white rounded-lg p-3 my-4 mb-6">
        <AddPost />
      </div>

      <div className="flex bg-white p-3 flex-col rounded-lg w-full">
        <h1 className="text-2xl">Your Posts</h1>

        <div className="flex my-12 flex-1 items-center justify-center">
          <p className="p-4 text-center text-gray-500 text-sm">
            You haven’t posted anything yet.
            <br /> Share your first post and let the world see what you’re up
            to!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Posts;
