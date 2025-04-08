import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetAllInvitesApiResponse = {
  success: boolean;
  message?: string;
  invites?: ChannelInvite[];
};

export type ChannelInviteApiResponse = {
  success: boolean;
  message: string;
};

const channelInviteApi = createApi({
  reducerPath: "channelInviteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/channel-invite/`,
  }),
  tagTypes: ["invites"],
  endpoints: (build) => ({
    getAllInvites: build.query<GetAllInvitesApiResponse, void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["invites"],
    }),
    inviteToChannel: build.mutation<
      ChannelInviteApiResponse,
      { channelId: string; receiverId: string }
    >({
      query: ({ channelId, receiverId }) => ({
        url: `/${channelId}/invite/${receiverId}`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    acceptChannelInvite: build.mutation<ChannelInviteApiResponse, string>({
      query: (inviteId: string) => ({
        url: `/${inviteId}/accept`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["invites"],
    }),
    declineChannelInvite: build.mutation<ChannelInviteApiResponse, string>({
      query: (inviteId: string) => ({
        url: `/${inviteId}/decline`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["invites"],
    }),
  }),
});

export const {
  useGetAllInvitesQuery,
  useInviteToChannelMutation,
  useAcceptChannelInviteMutation,
  useDeclineChannelInviteMutation,
} = channelInviteApi;

export default channelInviteApi;
