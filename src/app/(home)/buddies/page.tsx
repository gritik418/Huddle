"use client";
import { AppDispatch } from "@/app/store";
import Post from "@/components/Post/Post";
import PostSkeleton from "@/components/PostSkeleton/PostSkeleton";
import Spinner from "@/components/Spinner/Spinner";
import {
  getPostsByFollowingsAsync,
  selectPostByFollowings,
  selectPostByFollowingsLoading,
  selectPostByFollowingsPagination,
} from "@/features/post/postSlice";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

const Buddies = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const loading: boolean = useSelector(selectPostByFollowingsLoading);
  const posts: Post[] = useSelector(selectPostByFollowings);
  const pagination = useSelector(selectPostByFollowingsPagination);

  const fetchData = async () => {
    if (page >= 1) {
      dispatch(getPostsByFollowingsAsync({ page: page + 1, limit: 5 }));
      setPage(() => page + 1);
    }
  };

  useEffect(() => {
    if (page === 1) {
      dispatch(getPostsByFollowingsAsync({ page: page, limit: 5 }));
    }
  }, [dispatch, page]);

  if (!posts || !pagination || posts.length === 0) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-56px-16px-24px)] bg-white rounded-lg w-full text-xl justify-center items-center">
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

  if (loading && page === 1) {
    return (
      <div className="flex flex-col gap-4 text-xl rounded-lg w-full">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  return (
    <div className="flex max-h-full w-full bg-gray-100 flex-col gap-4">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchData}
        hasMore={pagination.totalPages! > page}
        loader={
          <div className="flex items-center py-6 justify-center">
            <Spinner variant={"small"} />
          </div>
        }
        className="w-full"
      >
        <div className="flex flex-col min-w-full flex-1 gap-3">
          {posts.map((post: Post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Buddies;
