"use client";
import loginSchema, { LoginData } from "@/validators/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import Link from "next/link";
import { LoginResponse, useUserLoginMutation } from "@/features/api/authApi";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoIosLock } from "react-icons/io";
import { Bounce, toast } from "react-toastify";

const Login = (): JSX.Element => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userLogin] = useUserLoginMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (loginData: LoginData): Promise<void> => {
    try {
      const { data, error } = await userLogin(loginData);
      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as LoginResponse;

        if (parsedError?.errors) {
          if (parsedError.errors?.password) {
            setError("password", {
              message: parsedError.errors.password,
            });
          }
          if (parsedError.errors?.identifier) {
            setError("identifier", {
              message: parsedError.errors.identifier,
            });
          }
          return;
        }
        if (parsedError?.message) {
          toast.error(parsedError.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          return;
        }
      }

      if (data?.success) {
        if (data.message) {
          toast.success(data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setTimeout(() => {
            router.push("/");
          }, 1200);
        }
      } else {
        if (data?.errors) {
          if (data.errors?.password) {
            setError("password", {
              message: data.errors.password,
            });
          }
          if (data.errors?.identifier) {
            setError("identifier", {
              message: data.errors.identifier,
            });
          }
          return;
        }
        if (data?.message) {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          return;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Some error occured.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex justify-center items-center border-2 min-h-screen py-16 bg-gray-100">
      <div className="flex bg-white max-w-[600px] w-[90%] flex-col items-center justify-center px-2 py-4 sm:p-8 rounded-lg">
        <Image
          src={"/images/logo-vertical.png"}
          alt="logo"
          height={140}
          width={140}
        />
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold">Welcome Back!</h1>
        <div className="flex mt-6 w-full flex-col">
          <h2 className="text-xl sm:text-2xl mb-6 font-semibold">
            Login to your account.
          </h2>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-1 flex-col justify-center"
          >
            <div className="flex flex-col mb-4">
              <label
                htmlFor="identifier"
                className="text-lg text-gray-600 font-medium"
              >
                Email or Username
              </label>

              <div className="flex items-center gap-2 rounded-md p-2 bg-gray-100 outline-none">
                <FaUser />
                <input
                  {...register("identifier")}
                  id="identifier"
                  type="text"
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Enter your email or username"
                />
              </div>
              {errors.identifier && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors?.identifier.message}
                </p>
              )}
            </div>

            <div className="flex flex-col mb-3">
              <div className="flex items-end justify-between">
                <label
                  htmlFor="password"
                  className="text-lg text-gray-600 font-medium"
                >
                  Password
                </label>
                <Link href={"/"} className="font-semibold text-sm">
                  Forgot Password?
                </Link>
              </div>
              <div className="flex items-center gap-2 rounded-md p-2 bg-gray-100 outline-none">
                <IoIosLock className="text-lg" />
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Enter your password"
                />
                <div
                  className="span"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors?.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--secondary)] text-white text-2xl font-semibold mt-6 h-12 rounded-lg"
            >
              {isSubmitting ? "Loading..." : "Login"}
            </button>
          </form>

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
            <p className="text-gray-400">Don&apos;t have an account?</p>
            <Link
              href={"/signup"}
              className="text-[var(--secondary)] font-bold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
