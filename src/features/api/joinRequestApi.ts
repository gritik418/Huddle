import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type JoinRequestApiResponse = {
  success: boolean;
  message: string;
};

export type GetJoinRequestsApiResponse = {
  success: boolean;
  message?: string;
  joinRequests: JoinRequest[];
};

const joinRequestApi = createApi({
  reducerPath: "joinRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/join-requests/`,
  }),
  endpoints: (build) => ({
    sendJoinRequest: build.mutation<JoinRequestApiResponse, string>({
      query: (channelId: string) => ({
        url: `/${channelId}`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getJoinRequests: build.query<GetJoinRequestsApiResponse, string>({
      query: (channelId: string) => ({
        url: `/${channelId}`,
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    acceptJoinRequest: build.mutation<JoinRequestApiResponse, string>({
      query: (requestId: string) => ({
        url: `/${requestId}/accept`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    declineJoinRequest: build.mutation<JoinRequestApiResponse, string>({
      query: (requestId: string) => ({
        url: `/${requestId}/decline`,
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
  useSendJoinRequestMutation,
  useGetJoinRequestsQuery,
  useAcceptJoinRequestMutation,
  useDeclineJoinRequestMutation,
} = joinRequestApi;

export default joinRequestApi;
