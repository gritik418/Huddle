import { ChannelData } from "@/validators/channelSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type CreateChannelApiResponse = {
  success: boolean;
  message: string;
  channel?: Channel;
  errors?: Partial<ChannelData>;
};

const channelApi = createApi({
  reducerPath: "channelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/channel`,
  }),
  endpoints: (build) => ({
    createChannel: build.mutation<CreateChannelApiResponse, ChannelData>({
      query: (data: ChannelData) => ({
        url: "/",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const { useCreateChannelMutation } = channelApi;

export default channelApi;
