"use client";
import { AppDispatch } from "@/app/store";
import {
  clearSearch,
  searchAsync,
  selectSearchedPosts,
  selectSearchLoading,
  selectSearchPostsPagination,
} from "@/features/search/searchSlice";
import { JSX, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import PostSkeleton from "../PostSkeleton/PostSkeleton";
import Spinner from "../Spinner/Spinner";

const SearchedHashtags = ({
  searchQuery,
}: {
  searchQuery: string;
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const posts: Post[] = useSelector(selectSearchedPosts);
  const loading: boolean = useSelector(selectSearchLoading);
  const pagination = useSelector(selectSearchPostsPagination);

  const fetchData = async () => {
    if (page >= 1) {
      if (searchQuery.length > 2) {
        dispatch(
          searchAsync({
            searchQuery,
            type: "hashtags",
            page: page + 1,
            limit: 5,
          })
        );
      }
      setPage(() => page + 1);
    }
  };

  useEffect(() => {
    setPage(1);
    const timeOutId = setTimeout(() => {
      dispatch(clearSearch());
      if (searchQuery.length > 2) {
        dispatch(
          searchAsync({ searchQuery, type: "hashtags", page: 1, limit: 5 })
        );
      }
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [searchQuery, dispatch]);

  function renderContent(): JSX.Element {
    if (loading && !posts && page === 1) {
      return (
        <div className="flex flex-col gap-3">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      );
    }

    if (
      (!posts || posts.length === 0 || !pagination) &&
      searchQuery.length < 3
    ) {
      return (
        <div className="flex items-center justify-center my-14">
          <p className="text-lg">
            Type atleast 3 characters to find posts with hashtag.
          </p>
        </div>
      );
    }

    if (!posts || posts.length === 0 || !pagination) {
      return (
        <div className="flex items-center justify-center my-14">
          <p className="text-lg">No posts found with this hashtag.</p>
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
        className="w-full"
      >
        <div className="flex flex-col gap-3">
          {posts.map((post: Post) => (
            <div className="flex border-b-2 border-b-gray-100" key={post._id}>
              <Post post={post} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    );
  }

  return <div>{renderContent()}</div>;
};

export default SearchedHashtags;
