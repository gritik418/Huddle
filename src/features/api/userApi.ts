import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetUserApiResponse = {
  success: boolean;
  message?: string;
  user?: User;
};

type ApiResponse = {
  success: boolean;
  message: string;
};

type GetFollowingApiResponse = {
  success: boolean;
  message?: string;
  following?: Follower[];
};

type GetPostsByUserApiResponse = {
  success: boolean;
  message?: string;
  posts?: Post[];
};

type GetFollowersApiResponse = {
  success: boolean;
  message?: string;
  followers?: Follower[];
};

type GetActiveMembersApiResponse = {
  success: boolean;
  message?: string;
  activeMembers?: string[];
};

type GetUsersForMentionApiResponse = {
  success: boolean;
  message?: string;
  users: Follower[];
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
    getPostsByUser: build.query<GetPostsByUserApiResponse, string>({
      query: (userId: string) => ({
        url: `/${userId}/posts`,
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
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
    getFollowings: build.query<GetFollowingApiResponse, void>({
      query: () => ({
        url: "/following",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getFollowers: build.query<GetFollowersApiResponse, void>({
      query: () => ({
        url: "/followers",
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
    getUsersForMention: build.query<GetUsersForMentionApiResponse, void>({
      query: () => ({
        url: "/mentions",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    unfollow: build.mutation<ApiResponse, string>({
      query: (followingId: string) => ({
        url: `/${followingId}/unfollow`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    removeFollower: build.mutation<ApiResponse, string>({
      query: (followerId: string) => ({
        url: `/${followerId}/remove`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUnfollowMutation,
  useGetFollowersQuery,
  useUpdateUserMutation,
  useGetFollowingsQuery,
  useGetPostsByUserQuery,
  useGetActiveMembersQuery,
  useGetUserByUsernameQuery,
  useRemoveFollowerMutation,
  useGetUsersForMentionQuery,
} = userApi;

export default userApi;
