import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getCreatedChannels, getJoinedChannels } from "./channelApi";
import channelApi from "../api/channelApi";

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

  channelMessages: ChannelMessage[];
}

const initialState: ChannelState = {
  joinedChannels: [],
  joinedChannelsLoading: false,
  joinedChannelIds: [],
  createdChannels: [],
  createdChannelsLoading: false,
  createdChannelIds: [],
  channelMessages: [],
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
  reducers: {
    addToChannelMessages: (state, action) => {
      if (action.payload.channelId) {
        state.channelMessages.push(action.payload);
      }
    },
    deleteChannelById: (state, action) => {
      if (state.createdChannelIds.includes(action.payload)) {
        state.createdChannels = state.createdChannels.filter(
          (channel: Channel) => channel._id !== action.payload
        );

        state.createdChannelIds = state.createdChannelIds.filter(
          (id: string) => id !== action.payload
        );
      }

      if (state.joinedChannelIds.includes(action.payload)) {
        state.joinedChannels = state.joinedChannels.filter(
          (channel: Channel) => channel._id !== action.payload
        );

        state.joinedChannelIds = state.joinedChannelIds.filter(
          (id: string) => id !== action.payload
        );
      }
    },
  },
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
      })
      .addMatcher(
        channelApi.endpoints.getChannelChatMessages.matchPending,
        (state) => {
          state.channelMessages = [];
        }
      )
      .addMatcher(
        channelApi.endpoints.getChannelChatMessages.matchFulfilled,
        (state, action) => {
          if (action.payload.messages) {
            state.channelMessages = action.payload.messages;
          }
        }
      )
      .addMatcher(
        channelApi.endpoints.getChannelChatMessages.matchRejected,
        (state) => {
          state.channelMessages = [];
        }
      );
  },
});

export const { addToChannelMessages, deleteChannelById } = channelSlice.actions;

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

export const selectChannelMessages = (state: RootState) =>
  state.channel.channelMessages;

export default channelSlice;
