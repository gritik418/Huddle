"use client";
import { useGetFollowRequestsQuery } from "../../features/api/followRequestApi";
import {
  useGetActiveMembersQuery,
  useGetFollowersQuery,
  useGetFollowingsQuery,
  useGetUserQuery,
} from "../../features/api/userApi";
import React, { JSX } from "react";
import Spinner from "../Spinner/Spinner";
import { usePathname } from "next/navigation";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";
import { useGetBlockedUsersQuery } from "@/features/api/blockUserApi";

const UserProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element => {
  const pathname: string = usePathname();

  const { isLoading, error } = useGetUserQuery();

  useGetActiveMembersQuery();
  useGetFollowRequestsQuery();
  useGetFollowingsQuery();
  useGetFollowersQuery();
  useGetBlockedUsersQuery();

  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/verify-email"
  ) {
    return <div>{children}</div>;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner variant="medium" loader={"bird"} />
      </div>
    );
  }

  if (error && !isLoading) {
    return <NotLoggedIn />;
  }

  return <div>{children}</div>;
};

export default UserProvider;
