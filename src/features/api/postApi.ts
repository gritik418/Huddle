import { PostData } from "@/validators/postSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type GetPostsByFollwingApiResponse = {
  success: boolean;
  message?: string;
  posts: Post[];
};

type GetFeedArgs = {
  page: number;
  limit: number;
};

type GetFeedApiResponse = {
  success: boolean;
  message?: string;
  posts?: Post[];
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type AddPostApiResponse = {
  success: boolean;
  message?: string;
  errors?: {
    content?: string;
    mentions?: string;
    location?: string;
    hashtags?: string;
    media?: string;
  };
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
    getLoggedInUserPosts: build.query<GetPostsByFollwingApiResponse, void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getFeed: build.query<GetFeedApiResponse, GetFeedArgs>({
      query: (args: GetFeedArgs) => ({
        url: `/feed?page=${args.page}&limit=${args.limit}`,
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    addPost: build.mutation<AddPostApiResponse, FormData>({
      query: (data: FormData) => ({
        url: "/",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPostsByFollwingQuery,
  useGetLoggedInUserPostsQuery,
  useGetFeedQuery,
  useAddPostMutation,
} = postApi;

export default postApi;
