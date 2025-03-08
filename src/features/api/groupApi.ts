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

export interface GetGroupByIdApiResponse {
  success: boolean;
  message?: string;
  group?: Group;
}

const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/group`,
  }),
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
    }),
  }),
});

export const { useCreateGroupMutation, useGetGroupByIdQuery } = groupApi;

export default groupApi;
