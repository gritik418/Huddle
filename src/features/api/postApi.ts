import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type GetPostsByFollwingApiResponse = {
  success: boolean;
  message?: string;
  posts: Post[];
};

const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post`,
  }),
  endpoints: (build) => ({
    getPostsByFollwing: build.query<GetPostsByFollwingApiResponse, void>({
      query: () => ({
        url: "/following",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetPostsByFollwingQuery } = postApi;

export default postApi;
