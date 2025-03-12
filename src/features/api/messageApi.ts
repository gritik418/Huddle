import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetMessagesApiResponse = {
  success: boolean;
  message?: string;
  messages?: [];
};

type ApiResponse = {
  success: boolean;
  message: string;
};

const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/message`,
  }),
  endpoints: (build) => ({
    getMessages: build.query<GetMessagesApiResponse, string>({
      query: (chatId: string) => ({
        url: `/${chatId}`,
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteMessageForMe: build.mutation<ApiResponse, string>({
      query: (messageId: string) => ({
        url: `/${messageId}/delete-for-me`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useDeleteMessageForMeMutation } =
  messageApi;

export default messageApi;
