"use client";
import Spinner from "@/components/Spinner/Spinner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useVerifyUserEmailMutation,
  VerifyEmailResponse,
} from "@/features/api/authApi";
import { selectSignupEmail } from "@/features/auth/authSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";

const VerifyEmail = () => {
  const [verifyEmail] = useVerifyUserEmailMutation();
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const email = useSelector(selectSignupEmail);
  const router = useRouter();

  if (!email) {
    redirect("/signup");
  }

  const handleVerifyEmail = async () => {
    setError("");
    if (otp.length !== 6) {
      setError("OTP must be exactly 6 digits long.");
    } else {
      try {
        setLoading(true);
        const { data, error } = await verifyEmail({ email, otp });
        setLoading(false);
        if (error) {
          const errorResponse = error as FetchBaseQueryError;
          const parsedError = errorResponse?.data as VerifyEmailResponse;

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
    }
  };

  const handleOtpChange = (value: string) => {
    if (value.length === 6) {
      setError("");
    }
    setOtp(value);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex rounded-xl flex-col shadow-xl p-4 py-8 w-[90%] items-center max-w-[450px]">
        <Image
          src={"/images/verify-email.png"}
          alt="verify-email"
          height={140}
          width={200}
          className="p-0"
        />
        <h1 className="text-2xl font-semibold mt-5">
          Verify your Email address
        </h1>

        <div className="flex flex-col mt-5">
          <p className="text-center">
            An OTP has been sent to
            <span className="font-semibold ml-1">{email}</span>.
          </p>
          <p className="text-center">
            Please check your inbox and enter the code below to verify your
            account.
          </p>
        </div>

        <div className="flex mt-6 flex-col items-center ">
          <InputOTP
            onChange={handleOtpChange}
            pattern={REGEXP_ONLY_DIGITS}
            maxLength={6}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && <span className="text-xs text-red-500 p-1">{error}</span>}
        </div>

        <button
          onClick={handleVerifyEmail}
          className="h-10 flex items-center justify-center bg-[var(--secondary)] w-24 mt-8 font-semibold text-white rounded-lg"
        >
          {loading ? <Spinner variant={null} /> : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
