import { LoginData } from "@/validators/loginSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const { useUserLoginMutation, useUserLogoutMutation } = authApi;

export default authApi;
