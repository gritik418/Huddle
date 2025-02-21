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

type GetActiveMembersApiResponse = {
  success: boolean;
  message?: string;
  activeMembers?: string[];
};

export type UpdateUserApiResponse = {
  success: boolean;
  message?: string;
  errors?: {
    firstName?: string;
    lastName?: string;
    username?: string;
    coverImage?: string;
    profilePicture?: string;
    bio?: string;
  };
};

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`,
  }),
  tagTypes: ["user"],
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
      providesTags: ["user"],
    }),
    getUserByUsername: build.query<GetUserApiResponse, string>({
      query: (username: string) => ({
        url: `/${username}`,
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
    getActiveMembers: build.query<GetActiveMembersApiResponse, void>({
      query: () => ({
        url: "/active",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateUser: build.mutation<UpdateUserApiResponse, FormData>({
      query: (data: FormData) => ({
        url: "/",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetFollowingQuery,
  useGetActiveMembersQuery,
  useGetUserByUsernameQuery,
  useUpdateUserMutation,
} = userApi;

export default userApi;
