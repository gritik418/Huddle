import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchUsersForChatRequest } from "./chatRequestAPI";

interface ChatRequestState {
  searchedUsersForChatRequest: SearchedUserForChat[];
  searchUserForChatRequestMessage: string;
}

const initialState: ChatRequestState = {
  searchedUsersForChatRequest: [],
  searchUserForChatRequestMessage: "",
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
  reducers: {},
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
      });
  },
});

export const selectSearchedUsersForChatRequest = (state: {
  chatRequest: ChatRequestState;
}) => state.chatRequest.searchedUsersForChatRequest;

export const selectSearchUserForChatRequestMessage = (state: {
  chatRequest: ChatRequestState;
}) => state.chatRequest.searchUserForChatRequestMessage;

export default chatRequestSlice;
