import AddPost from "@/components/AddPost/AddPost";
import React, { JSX } from "react";

const Posts = (): JSX.Element => {
  return (
    <div className="bg-white rounded-lg p-3 mt-4 mb-6">
      <AddPost />
    </div>
  );
};

export default Posts;
