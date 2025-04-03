import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getCreatedChannels, getJoinedChannels } from "./channelApi";

interface ChannelState {
  joinedChannels: Channel[];
  joinedChannelsLoading: boolean;
  joinedChannelsPagination?: {
    page: number;
    limit: number;
    totalPages: number;
  };
  joinedChannelIds: string[];
  createdChannels: Channel[];
  createdChannelsLoading: boolean;
  createdChannelsPagination?: {
    page: number;
    limit: number;
    totalPages: number;
  };
  createdChannelIds: string[];
}

const initialState: ChannelState = {
  joinedChannels: [],
  joinedChannelsLoading: false,
  joinedChannelIds: [],
  createdChannels: [],
  createdChannelsLoading: false,
  createdChannelIds: [],
};

export const getJoinedChannelsAsync = createAsyncThunk(
  "channels/getJoinedChannels",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await getJoinedChannels(page, limit);
    return response;
  }
);

export const getCreatedChannelsAsync = createAsyncThunk(
  "channels/getCreatedChannels",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await getCreatedChannels(page, limit);
    return response;
  }
);

const channelSlice = createSlice({
  name: "channel",
  reducerPath: "channel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJoinedChannelsAsync.pending, (state) => {
        state.joinedChannelsLoading = true;
      })
      .addCase(getJoinedChannelsAsync.fulfilled, (state, action) => {
        state.joinedChannelsLoading = false;
        if (action.payload.success) {
          if (action.payload.channels) {
            action.payload.channels.forEach((channel: Channel) => {
              if (!state.joinedChannelIds.includes(channel._id.toString())) {
                state.joinedChannelIds.push(channel._id.toString());
                state.joinedChannels.push(channel);
              }
            });

            state.joinedChannelsPagination = action.payload.pagination;
          }
        }
      })
      .addCase(getJoinedChannelsAsync.rejected, (state) => {
        state.joinedChannelsLoading = false;
      })
      .addCase(getCreatedChannelsAsync.pending, (state) => {
        state.createdChannelsLoading = true;
      })
      .addCase(getCreatedChannelsAsync.fulfilled, (state, action) => {
        state.createdChannelsLoading = false;
        if (action.payload.success) {
          if (action.payload.channels) {
            action.payload.channels.forEach((channel: Channel) => {
              if (!state.createdChannelIds.includes(channel._id.toString())) {
                state.createdChannelIds.push(channel._id.toString());
                state.createdChannels.push(channel);
              }
            });

            state.createdChannelsPagination = action.payload.pagination;
          }
        }
      })
      .addCase(getCreatedChannelsAsync.rejected, (state) => {
        state.createdChannelsLoading = false;
      });
  },
});

export const selectJoinedChannels = (state: RootState) =>
  state.channel.joinedChannels;
export const selectJoinedChannelsLoading = (state: RootState) =>
  state.channel.joinedChannelsLoading;
export const selectJoinedChannelsPagination = (state: RootState) =>
  state.channel.joinedChannelsPagination;

export const selectCreatedChannels = (state: RootState) =>
  state.channel.createdChannels;
export const selectCreatedChannelsLoading = (state: RootState) =>
  state.channel.createdChannelsLoading;
export const selectCreatedChannelsPagination = (state: RootState) =>
  state.channel.createdChannelsPagination;

export default channelSlice;
