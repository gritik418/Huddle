"use client";
import AddPost from "@/components/AddPost/AddPost";
import ProfilePost from "@/components/ProfilePost/ProfilePost";
import Spinner from "@/components/Spinner/Spinner";
import { useGetLoggedInUserPostsQuery } from "@/features/api/postApi";
import React, { JSX } from "react";

const Posts = (): JSX.Element => {
  const { isLoading, data, error } = useGetLoggedInUserPostsQuery();

  function renderContent(): JSX.Element {
    if (isLoading) {
      return (
        <div className="flex text-xl bg-white rounded-lg w-full justify-center items-center">
          <Spinner variant={"medium"} />
        </div>
      );
    }

    if (error || !data?.posts || data.posts.length === 0) {
      return (
        <div className="flex my-12 flex-1 items-center justify-center">
          <p className="p-4 text-center text-gray-500 text-sm">
            You haven’t posted anything yet.
            <br /> Share your first post and let the world see what you’re up
            to!
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-8 w-full">
        {data.posts.map((post: Post) => (
          <ProfilePost key={post._id} post={post} />
        ))}
      </div>
    );
  }
  return (
    <div className="mb-10 flex flex-col">
      <div className="bg-white rounded-lg p-3 my-4 mb-6">
        <AddPost />
      </div>

      <div className="flex bg-white p-3 flex-col rounded-lg w-full">
        <h1 className="text-2xl">Your Posts</h1>

        <div className="flex my-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Posts;
