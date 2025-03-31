"use client";
import { AppDispatch } from "../../app/store";
import {
  getFeedAsync,
  selectFeed,
  selectFeedLoading,
  selectPagination,
} from "../../features/post/postSlice";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import PostSkeleton from "../PostSkeleton/PostSkeleton";
import Spinner from "../Spinner/Spinner";

const Feed = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const loading: boolean = useSelector(selectFeedLoading);
  const posts: Post[] = useSelector(selectFeed);
  const pagination = useSelector(selectPagination);

  const fetchData = async () => {
    if (page >= 1) {
      dispatch(getFeedAsync({ page: page + 1, limit: 5 }));
      setPage(() => page + 1);
    }
  };

  useEffect(() => {
    if (page === 1) {
      dispatch(getFeedAsync({ page: page, limit: 5 }));
    }
  }, [dispatch, page]);

  if (!posts || !pagination) {
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

  if (loading && page === 1) {
    return (
      <div className="flex flex-col rounded-lg gap-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (!posts || posts.length === 0) {
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

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchData}
      hasMore={pagination.totalPages! > page}
      loader={
        <div className="flex items-center py-6 justify-center">
          <Spinner variant={"small"} />
        </div>
      }
    >
      <div className="flex gap-4 flex-col">
        {posts &&
          posts.length > 0 &&
          posts.map((post: Post) => <Post key={post._id} post={post} />)}
      </div>
    </InfiniteScroll>
  );
};

export default Feed;
