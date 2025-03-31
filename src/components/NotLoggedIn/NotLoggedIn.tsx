"use client";
import { AppDispatch } from "../../app/store";
import { useUserLogoutMutation } from "../../features/api/authApi";
import { useGetUserQuery } from "../../features/api/userApi";
import { clearUser } from "../../features/user/userSlice";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { JSX } from "react";

const NotLoggedIn = (): JSX.Element => {
  const [userLogout] = useUserLogoutMutation();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, data } = useGetUserQuery();
  const router = useRouter();

  const handleLogin = async () => {
    await userLogout();
    dispatch(clearUser());
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner variant="medium" loader={"bird"} />
      </div>
    );
  }

  if (data) {
    if (data.success && data.user) {
      redirect("/");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center flex items-center justify-center flex-col p-8 rounded-lg shadow-xl bg-opacity-70 backdrop-blur-md">
        <Image src={"/images/logo.png"} alt="logo" height={80} width={80} />
        <h1 className="text-4xl font-semibold mb-6">Welcome to Huddle!</h1>
        <p className="mb-9 text-lg">
          Please log in to access your account and start exploring the features.
        </p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default NotLoggedIn;
