import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetUserApiResponse = {
  success: boolean;
  message?: string;
  user?: User;
};

type GetFollowingApiResponse = {
  success: boolean;
  message?: string;
  following?: Follower[];
};

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`,
  }),
  endpoints: (build) => ({
    getUser: build.query<GetUserApiResponse, void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getFollowing: build.query<GetFollowingApiResponse, void>({
      query: () => ({
        url: "/following",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetFollowingQuery } = userApi;

export default userApi;
