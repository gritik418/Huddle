import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import followRequestApi from "../api/followRequestApi";

interface FollowRequestState {
  followRequests: FollowRequest[];
  followRequestsLoading: boolean;
}

const initialState: FollowRequestState = {
  followRequests: [],
  followRequestsLoading: false,
};

const followRequestSlice = createSlice({
  name: "followRequest",
  reducerPath: "followRequest",
  initialState,
  reducers: {
    addFollowRequest: (state, action) => {
      const existingRequest = state.followRequests.find(
        (request) => request._id === action.payload._id
      );
      if (!existingRequest) {
        state.followRequests.push(action.payload);
      }
    },
    removeFollowRequest: (state, action) => {
      const followRequests = state.followRequests.filter(
        (request) => request._id !== action.payload
      );
      state.followRequests = followRequests;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        followRequestApi.endpoints.getFollowRequests.matchPending,
        (state) => {
          state.followRequestsLoading = true;
        }
      )
      .addMatcher(
        followRequestApi.endpoints.getFollowRequests.matchFulfilled,
        (state, action) => {
          state.followRequestsLoading = false;
          if (action.payload.requests) {
            state.followRequests = action.payload.requests;
          }
        }
      )
      .addMatcher(
        followRequestApi.endpoints.getFollowRequests.matchRejected,
        (state) => {
          state.followRequestsLoading = false;
        }
      );
  },
});

export const { addFollowRequest, removeFollowRequest } =
  followRequestSlice.actions;

export const selectFollowRequests = (state: RootState) =>
  state.followRequest.followRequests;

export const selectFollowRequestsLoading = (state: RootState) =>
  state.followRequest.followRequestsLoading;

export default followRequestSlice;
