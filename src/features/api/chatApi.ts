import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetChatsApiResponse = {
  success: boolean;
  message?: string;
  chats?: Chat[];
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
  }),
});

export const { useGetChatsQuery } = chatApi;

export default chatApi;
