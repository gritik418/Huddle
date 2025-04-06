import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type JoinRequestApiResponse = {
  success: boolean;
  message: string;
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
  }),
});

export const { useSendJoinRequestMutation } = joinRequestApi;

export default joinRequestApi;
