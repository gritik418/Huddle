"use client";
import Navbar from "@/components/Navbar/Navbar";
import Spinner from "@/components/Spinner/Spinner";
import { useParams } from "next/navigation";
import React, { JSX } from "react";

const UserInfo = (): JSX.Element => {
  const params: { username: string } = useParams();
  if (!params) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Spinner variant="medium" />
      </div>
    );
  }

  const { username } = params;
  return (
    <div>
      <Navbar />
      {username}
    </div>
  );
};

export default UserInfo;
