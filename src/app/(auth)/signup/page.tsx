"use client";
import { AppDispatch } from "@/app/store";
import { SignupResponse, useUserSignupMutation } from "@/features/api/authApi";
import { setSignupEmail } from "@/features/auth/authSlice";
import signupSchema, { SignupData } from "@/validators/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAt, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Bounce, toast } from "react-toastify";

const SignUp = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userSignup] = useUserSignupMutation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<SignupData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = async (values: SignupData) => {
    try {
      const { data, error } = await userSignup(values);
      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as SignupResponse;

        if (parsedError?.errors) {
          if (parsedError.errors?.firstName) {
            setError("firstName", {
              message: parsedError.errors.firstName,
            });
          }
          if (parsedError.errors?.lastName) {
            setError("lastName", {
              message: parsedError.errors.lastName,
            });
          }
          if (parsedError.errors?.username) {
            setError("username", {
              message: parsedError.errors.username,
            });
          }
          if (parsedError.errors?.email) {
            setError("email", {
              message: parsedError.errors.email,
            });
          }
          if (parsedError.errors?.password) {
            setError("password", {
              message: parsedError.errors.password,
            });
          }
          if (parsedError.errors?.passwordConfirmation) {
            setError("passwordConfirmation", {
              message: parsedError.errors.passwordConfirmation,
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
        dispatch(setSignupEmail(values.email));
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
          router.push("/verify-email");
        }, 1200);
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
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold">
          Let&apos;s get started!
        </h1>
        <div className="flex mt-6 w-full flex-col">
          <h2 className="text-xl sm:text-2xl mb-6 font-semibold">
            Create an account.
          </h2>

          <form
            onSubmit={handleSubmit(handleSignup)}
            className="flex flex-1 flex-col justify-center"
          >
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
                  {...register("firstName")}
                  id="firstName"
                  type="text"
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Enter your first name"
                  name="firstName"
                />
              </div>
              {errors.firstName && touchedFields.firstName && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors?.firstName.message}
                </p>
              )}
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
                  {...register("lastName")}
                  id="lastName"
                  type="text"
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Enter your last name"
                  name="lastName"
                />
              </div>
              {errors.lastName && touchedFields.lastName && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors?.lastName.message}
                </p>
              )}
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
                  {...register("username")}
                  id="username"
                  type="text"
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Enter your username"
                  name="username"
                />
              </div>
              {errors.username && touchedFields.username && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors?.username.message}
                </p>
              )}
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
                  {...register("email")}
                  id="email"
                  type="text"
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Enter your email"
                  name="email"
                />
              </div>
              {errors.email && touchedFields.email && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors?.email.message}
                </p>
              )}
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
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Enter your password"
                  name="password"
                />
                <div
                  className="span"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {errors.password && touchedFields.password && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors?.password.message}
                </p>
              )}
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
                  {...register("passwordConfirmation")}
                  id="passwordConfirmation"
                  type={showPassword ? "text" : "password"}
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Enter your password"
                  name="passwordConfirmation"
                />

                <div
                  className="span"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {errors.passwordConfirmation &&
                touchedFields.passwordConfirmation && (
                  <p className="text-red-500 text-sm mt-1 font-semibold">
                    {errors?.passwordConfirmation.message}
                  </p>
                )}
            </div>

            <button
              type="submit"
              className="bg-[var(--secondary)] text-white text-2xl font-semibold mt-6 h-12 rounded-lg"
            >
              {isSubmitting ? "Loading..." : "Continue"}
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
