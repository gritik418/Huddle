import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type PulseApiResponse = {
  success: boolean;
  message: string;
  savedPulse?: Pulse;
};

export type DeletePulseApiResponse = {
  success: boolean;
  message: string;
};

const pulseApi = createApi({
  reducerPath: "pulseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pulse`,
  }),
  endpoints: (build) => ({
    addPulse: build.mutation<PulseApiResponse, { content: string }>({
      query: (data) => ({
        url: "/",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    deletePulse: build.mutation<DeletePulseApiResponse, string>({
      query: (pulseId: string) => ({
        url: `/${pulseId}`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useAddPulseMutation, useDeletePulseMutation } = pulseApi;

export default pulseApi;
