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

export type GetChannelChatsApiResponse = {
  success: boolean;
  message?: string;
  channels?: Channel[];
};

export type GetChannelMessagesApiResponse = {
  success: boolean;
  message?: string;
  messages?: ChannelMessage[];
};

export type DeleteChannelApiResponse = {
  success: boolean;
  message: string;
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
    getChannelChats: build.query<GetChannelChatsApiResponse, void>({
      query: () => ({
        url: "/chats",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getChannelChatMessages: build.query<GetChannelMessagesApiResponse, string>({
      query: (channelId: string) => ({
        url: `/${channelId}/messages`,
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteChannel: build.mutation<DeleteChannelApiResponse, string>({
      query: (channelId: string) => ({
        url: `/${channelId}`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    removeMemberFromChannel: build.mutation<
      DeleteChannelApiResponse,
      { memberId: string; channelId: string }
    >({
      query: ({ memberId, channelId }) => ({
        url: `/${channelId}/remove/${memberId}`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    leaveChannel: build.mutation<DeleteChannelApiResponse, string>({
      query: (channelId: string) => ({
        url: `/${channelId}/leave`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetChannelByIdQuery,
  useLeaveChannelMutation,
  useGetChannelChatsQuery,
  useCreateChannelMutation,
  useDeleteChannelMutation,
  useGetChannelChatMessagesQuery,
  useRemoveMemberFromChannelMutation,
} = channelApi;

export default channelApi;
