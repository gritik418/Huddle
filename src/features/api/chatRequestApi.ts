import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type SendChatRequestApiResponse = {
  success: boolean;
  message?: string;
};

const chatRequestApi = createApi({
  reducerPath: "chatRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat-requests`,
  }),
  endpoints: (build) => ({
    sendChatRequest: build.mutation<SendChatRequestApiResponse, string>({
      query: (receiverId: string) => ({
        url: "/",
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

export const { useSendChatRequestMutation } = chatRequestApi;

export default chatRequestApi;
