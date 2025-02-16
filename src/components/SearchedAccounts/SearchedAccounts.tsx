"use client";
import React, { JSX, useEffect } from "react";
import SearchedAccountItem from "../SearchedAccountItem/SearchedAccountItem";
import {
  searchAsync,
  selectSearchedAccounts,
  selectSearchLoading,
} from "@/features/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import Spinner from "../Spinner/Spinner";

const SearchedAccounts = ({
  searchQuery,
}: {
  searchQuery: string;
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const accounts: SearchedUserForChat[] = useSelector(selectSearchedAccounts);
  const loading: boolean = useSelector(selectSearchLoading);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(searchAsync({ searchQuery, type: "" }));
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  function renderContent(): JSX.Element {
    if (loading) {
      return (
        <div className="flex items-center justify-center my-6">
          <Spinner variant={"medium"} />
        </div>
      );
    }

    if (!accounts || accounts.length === 0) {
      return (
        <div className="flex items-center justify-center my-6">
          <p>No accounts found.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {accounts.map((user) => (
          <SearchedAccountItem key={user._id} user={user} />
        ))}
      </div>
    );
  }

  return <div className="">{renderContent()}</div>;
};

export default SearchedAccounts;
