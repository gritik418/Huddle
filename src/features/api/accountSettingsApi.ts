import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ApiResponse = {
  success: boolean;
  message: string;
};

const accountSettingsApi = createApi({
  reducerPath: "accountSettingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/account`,
  }),
  endpoints: (build) => ({
    toggleAccountPrivacy: build.mutation<ApiResponse, "public" | "private">({
      query: (privacy: string) => ({
        url: "/privacy",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: { privacy },
      }),
    }),
    toggleActiveStatusVisibility: build.mutation<ApiResponse, boolean>({
      query: (showActiveStatus: boolean) => ({
        url: "/active-status-visibility",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: { showActiveStatus },
      }),
    }),
    toggleMentionsAllowance: build.mutation<ApiResponse, boolean>({
      query: (allowMentions: boolean) => ({
        url: "/allow-mentions",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: { allowMentions },
      }),
    }),
  }),
});

export const {
  useToggleAccountPrivacyMutation,
  useToggleMentionsAllowanceMutation,
  useToggleActiveStatusVisibilityMutation,
} = accountSettingsApi;

export default accountSettingsApi;
