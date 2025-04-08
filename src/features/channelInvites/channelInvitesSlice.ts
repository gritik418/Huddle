import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import channelInviteApi from "../api/channelInviteApi";

interface ChannelInviteState {
  invites: ChannelInvite[];
  loading: boolean;
}

const initialState: ChannelInviteState = {
  invites: [],
  loading: false,
};

const channelInvitesSlice = createSlice({
  name: "channelInvite",
  reducerPath: "channelInvite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        channelInviteApi.endpoints.getAllInvites.matchPending,
        (state) => {
          state.loading = true;
          state.invites = [];
        }
      )
      .addMatcher(
        channelInviteApi.endpoints.getAllInvites.matchFulfilled,
        (state, action) => {
          state.loading = false;
          if (action.payload.invites) {
            state.invites = action.payload.invites;
          }
        }
      )
      .addMatcher(
        channelInviteApi.endpoints.getAllInvites.matchRejected,
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const selectInvites = (state: RootState) => state.channelInvite.invites;
export const selectInvitesLoading = (state: RootState) =>
  state.channelInvite.loading;

export default channelInvitesSlice;
