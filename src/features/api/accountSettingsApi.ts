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
  }),
});

export const { useToggleAccountPrivacyMutation } = accountSettingsApi;

export default accountSettingsApi;
