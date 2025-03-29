"use client";
import { AppDispatch } from "@/app/store";
import {
  clearSearch,
  searchAsync,
  selectSearchedAccounts,
  selectSearchLoading,
  selectSearchPagination,
} from "@/features/search/searchSlice";
import { JSX, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import SearchedAccountItem from "../SearchedAccountItem/SearchedAccountItem";
import SearchedAccountsSkeleton from "../SearchedAccountsSkeleton/SearchedAccountsSkeleton";
import Spinner from "../Spinner/Spinner";

const SearchedAccounts = ({
  searchQuery,
}: {
  searchQuery: string;
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const accounts: SearchedUserForChat[] = useSelector(selectSearchedAccounts);
  const loading: boolean = useSelector(selectSearchLoading);
  const pagination = useSelector(selectSearchPagination);

  const fetchData = async () => {
    if (page >= 1) {
      if (searchQuery.length > 2) {
        dispatch(
          searchAsync({
            searchQuery,
            type: "accounts",
            page: page + 1,
            limit: 10,
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
          searchAsync({ searchQuery, type: "accounts", page: 1, limit: 10 })
        );
      }
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [searchQuery, dispatch]);

  function renderContent(): JSX.Element {
    if (loading && page === 1) {
      return <SearchedAccountsSkeleton />;
    }

    if (searchQuery.length < 3) {
      return (
        <div className="flex items-center justify-center my-14">
          <p className="text-lg">Type atleast 3 characters to find users.</p>
        </div>
      );
    }

    if (!accounts || accounts.length === 0 || !pagination) {
      return (
        <div className="flex items-center justify-center my-6">
          <p className="text-lg">No accounts found.</p>
        </div>
      );
    }

    return (
      <InfiniteScroll
        dataLength={accounts.length}
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
          {accounts.map((user) => (
            <SearchedAccountItem key={user._id} user={user} />
          ))}
        </div>
      </InfiniteScroll>
    );
  }

  return <div>{renderContent()}</div>;
};

export default SearchedAccounts;
