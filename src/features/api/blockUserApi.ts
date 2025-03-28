import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetBlockedUsersApiResponse = {
  success: boolean;
  message?: string;
  blockedUsers?: Follower[];
};

const blockUserApi = createApi({
  reducerPath: "blockUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`,
  }),
  tagTypes: ["block"],
  endpoints: (build) => ({
    getBlockedUsers: build.query<GetBlockedUsersApiResponse, void>({
      query: () => ({
        url: "/block",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["block"],
    }),
    unblockUser: build.mutation<void, string>({
      query: (userId: string) => ({
        url: `/${userId}/unblock`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["block"],
    }),
  }),
});

export const { useGetBlockedUsersQuery, useUnblockUserMutation } = blockUserApi;

export default blockUserApi;
