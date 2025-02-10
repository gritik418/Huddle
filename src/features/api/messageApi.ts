import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetMessagesApiResponse = {
  success: boolean;
  message?: string;
  messages?: [];
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
  }),
});

export const { useGetMessagesQuery } = messageApi;

export default messageApi;
