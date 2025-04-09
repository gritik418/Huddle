import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type StoryApiResponse = { success: boolean; message: string };

type GetOwnStoryApiResponse = {
  success: boolean;
  message?: string;
  stories?: Story[];
};

const storyApi = createApi({
  reducerPath: "storyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/story`,
  }),
  endpoints: (build) => ({
    addToStory: build.mutation<StoryApiResponse, FormData>({
      query: (formData) => ({
        url: "/",
        credentials: "include",
        method: "POST",
        body: formData,
      }),
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
    }),
  }),
});

export const { useGetOwnStoryQuery, useAddToStoryMutation } = storyApi;

export default storyApi;
