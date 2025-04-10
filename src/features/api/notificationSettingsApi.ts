import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetNotificationSettingsApiResponse = {
  success: boolean;
  message?: string;
  settings?: NotificationSettings;
};

type NotificationSettingsApiResponse = {
  success: boolean;
  message: string;
};

const notificationSettingsApi = createApi({
  reducerPath: "notificationSettingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notification-settings`,
  }),
  tagTypes: ["NotificationSettings"],
  endpoints: (build) => ({
    getNotificationSettings: build.query<
      GetNotificationSettingsApiResponse,
      void
    >({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["NotificationSettings"],
    }),
    updateNotificationSetting: build.mutation<
      NotificationSettingsApiResponse,
      { key: string; value: boolean }
    >({
      query: ({ key, value }) => ({
        url: `/${key}`,
        method: "PUT",
        credentials: "include",
        body: { value },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["NotificationSettings"],
    }),
  }),
});

export const {
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingMutation,
} = notificationSettingsApi;

export default notificationSettingsApi;
