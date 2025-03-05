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

export type PostApiResponse = {
  success: boolean;
  message: string;
};

const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post`,
  }),
  tagTypes: ["loggedInUserPosts", "posts"],
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
      providesTags: ["posts"],
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
      providesTags: ["loggedInUserPosts", "posts"],
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
      providesTags: ["posts"],
    }),
    addPost: build.mutation<AddPostApiResponse, FormData>({
      query: (data: FormData) => ({
        url: "/",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    removePost: build.mutation<PostApiResponse, string>({
      query: (postId: string) => ({
        url: `/${postId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["loggedInUserPosts"],
    }),
    likePost: build.mutation<PostApiResponse, string>({
      query: (postId: string) => ({
        url: `/${postId}/like`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["posts"],
    }),
    unlikePost: build.mutation<PostApiResponse, string>({
      query: (postId: string) => ({
        url: `/${postId}/like`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useGetFeedQuery,
  useAddPostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useRemovePostMutation,
  useGetPostsByFollwingQuery,
  useGetLoggedInUserPostsQuery,
} = postApi;

export default postApi;
