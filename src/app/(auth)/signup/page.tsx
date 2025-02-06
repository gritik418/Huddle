"use client";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import { FaAt, FaEye, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const SignUp = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center border-2 min-h-screen py-16 bg-gray-100">
      <div className="flex bg-white max-w-[600px] w-[90%] flex-col items-center justify-center px-2 py-4 sm:p-8 rounded-lg">
        <Image
          src={"/images/logo-vertical.png"}
          alt="logo"
          height={140}
          width={140}
        />
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold">
          Let&apos;s get started!
        </h1>
        <div className="flex mt-6 w-full flex-col">
          <h2 className="text-xl sm:text-2xl mb-6 font-semibold">
            Create an account.
          </h2>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="firstName"
              className="text-lg text-gray-600 font-medium"
            >
              First Name
            </label>

            <div className="flex items-center gap-2 rounded-md p-2 bg-gray-100 outline-none">
              <FaUser />
              <input
                id="firstName"
                type="text"
                className="flex-1 bg-transparent outline-none"
                placeholder="Enter your first name"
                name="firstName"
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="lastName"
              className="text-lg text-gray-600 font-medium"
            >
              Last Name
            </label>

            <div className="flex items-center gap-2 rounded-md p-2 bg-gray-100 outline-none">
              <FaUser />
              <input
                id="lastName"
                type="text"
                className="flex-1 bg-transparent outline-none"
                placeholder="Enter your last name"
                name="lastName"
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="username"
              className="text-lg text-gray-600 font-medium"
            >
              Username
            </label>

            <div className="flex items-center gap-2 rounded-md p-2 bg-gray-100 outline-none">
              <FaAt />
              <input
                id="username"
                type="text"
                className="flex-1 bg-transparent outline-none"
                placeholder="Enter your username"
                name="username"
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="email"
              className="text-lg text-gray-600 font-medium"
            >
              Email
            </label>

            <div className="flex items-center gap-2 rounded-md p-2 bg-gray-100 outline-none">
              <MdEmail />
              <input
                id="email"
                type="text"
                className="flex-1 bg-transparent outline-none"
                placeholder="Enter your email"
                name="email"
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="password"
              className="text-lg text-gray-600 font-medium"
            >
              Password
            </label>

            <div className="flex items-center gap-2 rounded-md p-2 bg-gray-100 outline-none">
              <IoIosLock className="text-lg" />
              <input
                id="password"
                type="password"
                className="flex-1 bg-transparent outline-none"
                placeholder="Enter your password"
                name="password"
              />
              <FaEye />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="passwordConfirmation"
              className="text-lg text-gray-600 font-medium"
            >
              Confirm Password
            </label>

            <div className="flex items-center gap-2 rounded-md p-2 bg-gray-100 outline-none">
              <IoIosLock className="text-lg" />
              <input
                id="passwordConfirmation"
                type="password"
                className="flex-1 bg-transparent outline-none"
                placeholder="Enter your password"
                name="passwordConfirmation"
              />
              <FaEye />
            </div>
          </div>

          <button className="bg-[var(--secondary)] text-white text-2xl font-semibold mt-6 h-12 rounded-lg">
            Continue
          </button>

          <div className="flex w-full my-6 items-center justify-evenly">
            <div className="h-1 w-1/3 border-t-2 border-black"></div>
            <p className="text-center font-bold">OR</p>
            <div className="h-1 w-1/3 border-t-2 border-black"></div>
          </div>

          <button className="flex border-2 items-center justify-center gap-2 text-2xl font-semibold h-12 rounded-lg">
            <FcGoogle className="text-3xl" />
            Google
          </button>

          <div className="flex items-center justify-center mt-4 gap-1">
            <p className="text-gray-400">Already have an account?</p>
            <Link href={"/login"} className="text-[var(--secondary)] font-bold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
