import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type SearchedUser = {
  _id: string;
  username: string;
  profilePicture?: string;
  firstName: string;
  lastName?: string;
};

type SearchUsersResponse = {
  success: boolean;
  message?: string;
  users: SearchedUser[];
};

const chatRequestApi = createApi({
  reducerPath: "chatRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat-requests`,
  }),
  endpoints: (build) => ({
    searchUsers: build.query<SearchUsersResponse, string>({
      query: (searchQuery) => ({
        url: `/search?q=${searchQuery}`,
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useSearchUsersQuery } = chatRequestApi;

export default chatRequestApi;
