import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CreateGroupApiResponse {
  success: boolean;
  message?: string;
  errors?: {
    groupName?: string;
    groupDescription?: string;
    members?: string;
    admins?: string;
  };
}

export interface GroupApiResponse {
  success: boolean;
  message: string;
}

export interface GetGroupByIdApiResponse {
  success: boolean;
  message?: string;
  group?: Group;
}

type UpdateInfoArgs = {
  groupId: string;
  data: { groupName: string; groupDescription: string };
};

const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/group`,
  }),
  tagTypes: ["groupIcon", "groupInfo"],
  endpoints: (build) => ({
    createGroup: build.mutation<CreateGroupApiResponse, FormData>({
      query: (data: FormData) => ({
        url: "/",
        body: data,
        method: "POST",
        credentials: "include",
      }),
    }),
    getGroupById: build.query<GetGroupByIdApiResponse, string>({
      query: (groupId: string) => ({
        url: `/${groupId}`,
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["groupIcon", "groupInfo"],
    }),
    leaveGroup: build.mutation<GroupApiResponse, string>({
      query: (groupId: string) => ({
        url: `/leave/${groupId}`,
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteGroup: build.mutation<GroupApiResponse, string>({
      query: (groupId: string) => ({
        url: `/${groupId}`,
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateGroupIcon: build.mutation<
      GroupApiResponse,
      { groupId: string; data: FormData }
    >({
      query: ({ groupId, data }) => ({
        url: `/${groupId}/icon`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["groupIcon"],
    }),
    updateGroupInfo: build.mutation<GroupApiResponse, UpdateInfoArgs>({
      query: ({ groupId, data }) => ({
        url: `/${groupId}/info`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["groupInfo"],
    }),
  }),
});

export const {
  useGetGroupByIdQuery,
  useLeaveGroupMutation,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupIconMutation,
  useUpdateGroupInfoMutation,
} = groupApi;

export default groupApi;
