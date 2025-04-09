import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type StoryApiResponse = { success: boolean; message: string };

type GetOwnStoryApiResponse = {
  success: boolean;
  message?: string;
  stories?: Story[];
};

interface UserWithStories {
  user: Follower;
  stories: Story[];
}

type GetFollowingsStoryApiResponse = {
  success: boolean;
  message?: string;
  stories?: UserWithStories[];
};

const storyApi = createApi({
  reducerPath: "storyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/story`,
  }),
  tagTypes: ["ownStory"],
  endpoints: (build) => ({
    addToStory: build.mutation<StoryApiResponse, FormData>({
      query: (formData) => ({
        url: "/",
        credentials: "include",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ownStory"],
    }),
    getOwnStory: build.query<GetOwnStoryApiResponse, void>({
      query: () => ({
        url: "/me",
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["ownStory"],
    }),
    deleteStory: build.mutation<StoryApiResponse, string>({
      query: (storyId: string) => ({
        url: `/${storyId}`,
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["ownStory"],
    }),
    getFollowingsStory: build.query<GetFollowingsStoryApiResponse, void>({
      query: () => ({
        url: "/followings",
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["ownStory"],
    }),
  }),
});

export const {
  useGetOwnStoryQuery,
  useAddToStoryMutation,
  useDeleteStoryMutation,
  useGetFollowingsStoryQuery,
} = storyApi;

export default storyApi;
