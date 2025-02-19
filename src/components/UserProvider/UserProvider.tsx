"use client";
import { useGetFollowRequestsQuery } from "@/features/api/followRequestApi";
import {
  useGetActiveMembersQuery,
  useGetFollowingQuery,
  useGetUserQuery,
} from "@/features/api/userApi";
import React, { JSX } from "react";
import Spinner from "../Spinner/Spinner";

const UserProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element => {
  const { isLoading } = useGetUserQuery();
  useGetActiveMembersQuery();
  useGetFollowRequestsQuery();
  useGetFollowingQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner variant="medium" />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default UserProvider;
