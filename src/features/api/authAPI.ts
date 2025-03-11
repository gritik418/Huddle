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
    userLogin: build.mutation<LoginResponse, LoginData>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
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
} = authApi;

export default authApi;
