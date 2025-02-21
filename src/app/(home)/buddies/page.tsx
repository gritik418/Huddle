"use client";
import Spinner from "@/components/Spinner/Spinner";
import { useGetPostsByFollwingQuery } from "@/features/api/postApi";
import Image from "next/image";
import { JSX } from "react";

const Buddies = (): JSX.Element => {
  const { isLoading, data, error } = useGetPostsByFollwingQuery();

  function renderContent(): JSX.Element {
    if (isLoading) {
      return (
        <div className="flex text-xl bg-white rounded-lg justify-center w-full items-center">
          <Spinner variant={"medium"} />
        </div>
      );
    }

    if (error || !data?.posts || data.posts.length === 0) {
      return (
        <div className="flex flex-col text-xl bg-white rounded-lg justify-center w-full items-center">
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

    return <div className="flex">{data.posts[0].content}</div>;
  }
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-1 w-full">{renderContent()}</div>
    </div>
  );
};

export default Buddies;
