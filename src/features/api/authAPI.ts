import { LoginData } from "@/validators/loginSchema";
import { SignupData } from "@/validators/signupSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type SignupResponse = {
  success: boolean;
  message?: string;
  errors?: {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
  };
};

export type VerifyEmailResponse = {
  success: boolean;
  message: string;
};

export type LoginResponse = {
  success: boolean;
  message?: string;
  errors?: {
    identifier?: string;
    password?: string;
  };
};

export type LogoutResponse = {
  success: boolean;
  message?: string;
};

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth`,
  }),
  endpoints: (build) => ({
    userSignup: build.mutation<SignupResponse, SignupData>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    verifyUserEmail: build.mutation<
      VerifyEmailResponse,
      { email: string; otp: string }
    >({
      query: (data) => ({
        url: "/verify-email",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    userLogin: build.mutation<LoginResponse, LoginData>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          console.log(
            "🔥 Authorization:",
            meta?.response?.headers.get("Authorization")
          ); // ✅ Check if it comes in response
        } catch (error) {
          console.error("🔥 Login Error:", error);
        }
      },
    }),
    userLogout: build.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserLogoutMutation,
  useUserSignupMutation,
  useVerifyUserEmailMutation,
} = authApi;

export default authApi;
