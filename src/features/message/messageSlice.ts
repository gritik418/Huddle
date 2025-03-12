import { createSlice } from "@reduxjs/toolkit";
import messageApi from "../api/messageApi";
import { RootState } from "@/app/store";

interface MessageState {
  messages: Message[];
  messagesLoading: boolean;
}

const initialState: MessageState = {
  messages: [],
  messagesLoading: false,
};

const messageSlice = createSlice({
  name: "message",
  reducerPath: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      if (action.payload.chatId) {
        state.messages.push(action.payload);
      }
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(messageApi.endpoints.getMessages.matchPending, (state) => {
        state.messagesLoading = true;
        state.messages = [];
      })
      .addMatcher(
        messageApi.endpoints.getMessages.matchFulfilled,
        (state, action) => {
          if (action.payload.messages) {
            state.messagesLoading = false;
            state.messages = action.payload.messages;
          }
        }
      )
      .addMatcher(messageApi.endpoints.getMessages.matchRejected, (state) => {
        state.messagesLoading = false;
        state.messages = [];
      });
  },
});

export const selectMessages = (state: RootState) => state.message.messages;
export const selectMessagesLoading = (state: RootState) =>
  state.message.messagesLoading;

export const { addMessage, clearMessages } = messageSlice.actions;

export default messageSlice;
