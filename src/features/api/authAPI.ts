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
  }),
});

export const { useUserLoginMutation } = authApi;

export default authApi;
