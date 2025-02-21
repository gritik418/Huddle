"use client";
import Post from "@/components/Post/Post";
import Spinner from "@/components/Spinner/Spinner";
import { useGetPostsByFollwingQuery } from "@/features/api/postApi";
import Image from "next/image";
import { JSX } from "react";

const Buddies = (): JSX.Element => {
  const { isLoading, data, error } = useGetPostsByFollwingQuery();

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
        <div className="flex flex-col bg-white rounded-lg w-full text-xl justify-center items-center">
          <Image
            src={"/images/no-following-post.jpg"}
            alt="no-post"
            height={240}
            width={240}
          />
          <p>No posts from users you are following.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4 w-full">
        {data.posts.map((post: Post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-1 w-full rounded-lg overflow-y-scroll hide-scrollbar">
        {renderContent()}
      </div>
    </div>
  );
};

export default Buddies;
