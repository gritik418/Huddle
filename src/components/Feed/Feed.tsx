import { useGetFeedQuery } from "@/features/api/postApi";
import React, { JSX, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../Post/Post";
import Spinner from "../Spinner/Spinner";
import Image from "next/image";
import PostSkeleton from "../PostSkeleton/PostSkeleton";

const Feed = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const limit = 20;

  const { error, data, isLoading, isFetching } = useGetFeedQuery({
    limit,
    page,
  });

  const fetchData = () => {
    if (!isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col bg-white rounded-lg py-20 items-center justify-center">
        <Image
          src={"/images/no-following-post.jpg"}
          alt="no-post"
          height={300}
          width={300}
        />
        <p className="text-xl">
          Oops! It looks like there are no posts here yet.
        </p>
      </div>
    );
  }

  if (isLoading && page === 1) {
    return (
      <div className="flex flex-col rounded-lg gap-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (!data?.posts || data.posts.length === 0) {
    return (
      <div className="flex flex-col bg-white rounded-lg py-20 items-center justify-center">
        <Image
          src={"/images/no-following-post.jpg"}
          alt="no-post"
          height={300}
          width={300}
        />
        <p className="text-xl">
          Oops! It looks like there are no posts here yet.
        </p>
      </div>
    );
  }

  const posts = data?.posts || [];

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchData}
        hasMore={data?.pagination?.totalPages! > page}
        loader={<Spinner variant={null} />}
        refreshFunction={() => setPage(1)}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        <div className="flex gap-4 flex-col">
          {posts &&
            posts.length > 0 &&
            posts.map((post: Post) => <Post key={post._id} post={post} />)}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
