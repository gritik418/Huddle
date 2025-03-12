import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetChatsApiResponse = {
  success: boolean;
  message?: string;
  chats?: Chat[];
};

type GetChatByIdApiResponse = {
  success: boolean;
  message?: string;
  chat?: Chat;
};

type ApiResponse = {
  success: boolean;
  message: string;
};

const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat`,
  }),
  endpoints: (build) => ({
    getChats: build.query<GetChatsApiResponse, void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getChatById: build.query<GetChatByIdApiResponse, string>({
      query: (chatId: string) => ({
        url: `/${chatId}`,
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    clearChat: build.mutation<ApiResponse, string>({
      query: (chatId: string) => ({
        url: `/${chatId}/clear`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteChat: build.mutation<ApiResponse, string>({
      query: (chatId: string) => ({
        url: `/${chatId}/delete`,
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
  useGetChatsQuery,
  useGetChatByIdQuery,
  useClearChatMutation,
  useDeleteChatMutation,
} = chatApi;

export default chatApi;
