import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GroupData {
  groupName: string;
  groupDescription: string;
  members: string[];
  admins: string[];
}

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

const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/group`,
  }),
  endpoints: (build) => ({
    createGroup: build.mutation<CreateGroupApiResponse, GroupData>({
      query: (data: GroupData) => ({
        url: "/",
        body: data,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useCreateGroupMutation } = groupApi;

export default groupApi;
