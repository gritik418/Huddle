import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchUsersForChatRequest } from "./chatRequestAPI";
import { RootState } from "@/app/store";
import chatRequestApi from "../api/chatRequestApi";

interface ChatRequestState {
  searchedUsersForChatRequest: SearchedUserForChat[];
  searchUserForChatRequestMessage: string;
  chatRequests: ChatRequest[];
  chatRequestsLoading: boolean;
}

const initialState: ChatRequestState = {
  searchedUsersForChatRequest: [],
  searchUserForChatRequestMessage: "",
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
      console.log(action.payload);
      const existingRequest = state.chatRequests.find(
        (request) => request._id === action.payload._id
      );
      if (!existingRequest) {
        state.chatRequests.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsersForChatRequestAsync.pending, (state, action) => {
        state.searchUserForChatRequestMessage = "";
        state.searchedUsersForChatRequest = [];
      })
      .addCase(searchUsersForChatRequestAsync.fulfilled, (state, action) => {
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
      .addCase(searchUsersForChatRequestAsync.rejected, (state, action) => {
        state.searchUserForChatRequestMessage =
          "We couldn't find any matching users.";
      })
      .addMatcher(
        chatRequestApi.endpoints.getChatRequests.matchPending,
        (state, action) => {
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
        (state, action) => {
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

export const selectChatRequestsLoading = (state: RootState) =>
  state.chatRequest.chatRequestsLoading;

export const selectChatRequests = (state: RootState) =>
  state.chatRequest.chatRequests;

export const { addChatRequest } = chatRequestSlice.actions;

export default chatRequestSlice;
