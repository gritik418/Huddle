import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type SendChatRequestApiResponse = {
  success: boolean;
  message?: string;
};

export type ChatRequestApiResponse = {
  success: boolean;
  message?: string;
};

export type GetChatRequestsApiResponse = {
  success: boolean;
  message?: string;
  requests?: [];
};

const chatRequestApi = createApi({
  reducerPath: "chatRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat-requests`,
  }),
  endpoints: (build) => ({
    getChatRequests: build.query<GetChatRequestsApiResponse, void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
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
    acceptChatRequest: build.mutation<ChatRequestApiResponse, string>({
      query: (requestId: string) => ({
        url: `/${requestId}/accept`,
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    declineChatRequest: build.mutation<ChatRequestApiResponse, string>({
      query: (requestId: string) => ({
        url: `/${requestId}/decline`,
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useSendChatRequestMutation,
  useGetChatRequestsQuery,
  useAcceptChatRequestMutation,
  useDeclineChatRequestMutation,
} = chatRequestApi;

export default chatRequestApi;
