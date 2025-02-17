import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type GetFollowRequestsApiResponse = {
  success: boolean;
  message?: string;
  requests?: [];
};

export type SendFollowRequestApiResponse = {
  success: boolean;
  message?: string;
};

const followRequestApi = createApi({
  reducerPath: "followRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/follow-requests`,
  }),
  endpoints: (build) => ({
    getFollowRequests: build.query<GetFollowRequestsApiResponse, void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    sendFollowRequest: build.mutation<SendFollowRequestApiResponse, string>({
      query: (receiverId: string) => ({
        url: `/${receiverId}`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: { receiverId },
      }),
    }),
  }),
});

export const { useGetFollowRequestsQuery, useSendFollowRequestMutation } =
  followRequestApi;

export default followRequestApi;
