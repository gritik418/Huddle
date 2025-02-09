"use client";
import { useGetUserQuery } from "@/features/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { JSX } from "react";
import Spinner from "../Spinner/Spinner";

const UserProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element => {
  const { isLoading, error } = useGetUserQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner variant="medium" />
      </div>
    );
  }

  if (error) {
    const errorResponse = error as FetchBaseQueryError;
    const parsedError = errorResponse.data as {
      message: string;
      success: boolean;
    };

    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-red-400">
          {parsedError.message || "Server error: Unable to load user data."}
        </p>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default UserProvider;
