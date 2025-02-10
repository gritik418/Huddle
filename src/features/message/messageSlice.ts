import { createSlice } from "@reduxjs/toolkit";
import messageApi from "../api/messageApi";
import { RootState } from "@/app/store";

interface MessageState {
  messages: Message[];
}

const initialState: MessageState = {
  messages: [],
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
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      messageApi.endpoints.getMessages.matchFulfilled,
      (state, action) => {
        if (action.payload.messages) {
          state.messages = action.payload.messages;
        }
      }
    );
  },
});

export const selectMessages = (state: RootState) => state.message.messages;

export const { addMessage } = messageSlice.actions;

export default messageSlice;
