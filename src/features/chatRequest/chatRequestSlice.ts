import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchUsersForChatRequest } from "./chatRequestAPI";
import { RootState } from "@/app/store";
import chatRequestApi from "../api/chatRequestApi";

interface ChatRequestState {
  searchedUsersForChatRequest: SearchedUserForChat[];
  searchUserForChatRequestMessage: string;
  chatRequests: ChatRequest[];
  chatRequestsLoading: boolean;
  searchUserForChatRequestLoading: boolean;
}

const initialState: ChatRequestState = {
  searchedUsersForChatRequest: [],
  searchUserForChatRequestMessage: "",
  searchUserForChatRequestLoading: false,
  chatRequests: [],
  chatRequestsLoading: false,
};

export const searchUsersForChatRequestAsync = createAsyncThunk(
  "chatRequest/searchUsers",
  async (searchQuery: string) => {
    const response = await searchUsersForChatRequest(searchQuery);
    return response;
  }
);

const chatRequestSlice = createSlice({
  reducerPath: "chatRequest",
  name: "chatRequest",
  initialState,
  reducers: {
    addChatRequest: (state, action) => {
      const existingRequest = state.chatRequests.find(
        (request) => request._id === action.payload._id
      );
      if (!existingRequest) {
        state.chatRequests.push(action.payload);
      }
    },
    removeChatRequest: (state, action) => {
      const chatRequests = state.chatRequests.filter(
        (request) => request._id !== action.payload
      );
      state.chatRequests = chatRequests;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsersForChatRequestAsync.pending, (state) => {
        state.searchUserForChatRequestLoading = true;
        state.searchUserForChatRequestMessage = "";
        state.searchedUsersForChatRequest = [];
      })
      .addCase(searchUsersForChatRequestAsync.fulfilled, (state, action) => {
        state.searchUserForChatRequestLoading = false;
        if (action.payload) {
          if (action.payload?.success) {
            if (action.payload.users) {
              state.searchedUsersForChatRequest = action.payload.users;
            } else {
              state.searchUserForChatRequestMessage = action.payload.message;
            }
          }
        }
      })
      .addCase(searchUsersForChatRequestAsync.rejected, (state) => {
        state.searchUserForChatRequestLoading = false;
        state.searchUserForChatRequestMessage =
          "We couldn't find any matching users.";
      })
      .addMatcher(
        chatRequestApi.endpoints.getChatRequests.matchPending,
        (state) => {
          state.chatRequestsLoading = true;
        }
      )
      .addMatcher(
        chatRequestApi.endpoints.getChatRequests.matchFulfilled,
        (state, action) => {
          state.chatRequestsLoading = false;
          if (action.payload.success) {
            state.chatRequests = action.payload.requests || [];
          }
        }
      )
      .addMatcher(
        chatRequestApi.endpoints.getChatRequests.matchRejected,
        (state) => {
          state.chatRequestsLoading = false;
          state.chatRequests = [];
        }
      );
  },
});

export const selectSearchedUsersForChatRequest = (state: RootState) =>
  state.chatRequest.searchedUsersForChatRequest;

export const selectSearchUserForChatRequestMessage = (state: RootState) =>
  state.chatRequest.searchUserForChatRequestMessage;

export const selectSearchUserForChatRequestLoading = (state: RootState) =>
  state.chatRequest.searchUserForChatRequestLoading;

export const selectChatRequestsLoading = (state: RootState) =>
  state.chatRequest.chatRequestsLoading;

export const selectChatRequests = (state: RootState) =>
  state.chatRequest.chatRequests;

export const { addChatRequest, removeChatRequest } = chatRequestSlice.actions;

export default chatRequestSlice;
