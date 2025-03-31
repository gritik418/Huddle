import { ChannelData } from "@/validators/channelSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type CreateChannelApiResponse = {
  success: boolean;
  message: string;
  channel?: Channel;
  errors?: Partial<ChannelData>;
};

export type GetChannelApiResponse = {
  success: boolean;
  message?: string;
  channel?: {
    _id: string;
    creatorId: Follower;
    description: string;
    isActive: boolean;
    members: Follower[];
    name: string;
    sendMessagePermission: "creator" | "members" | "everyone";
    type: "public" | "private" | "invite-only";
  };
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
    getChannelById: build.query<GetChannelApiResponse, string>({
      query: (channelId: string) => ({
        url: `/${channelId}`,
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useCreateChannelMutation, useGetChannelByIdQuery } = channelApi;

export default channelApi;
