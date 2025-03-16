import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type PulseApiResponse = {
  success: boolean;
  message: string;
};

export type GetAllPulsesApiResponse = {
  success: boolean;
  message?: string;
  pulses?: Pulse[];
  pagination?: { page: number; limit: number; totalPages: number };
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
  }),
});

export const { useAddPulseMutation } = pulseApi;

export default pulseApi;
