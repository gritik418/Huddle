import { createSlice } from "@reduxjs/toolkit";
import chatApi from "../api/chatApi";
import { RootState } from "@/app/store";

interface ChatState {
  chats: Chat[];
  chatsLoading: boolean;
}

const initialState: ChatState = {
  chats: [],
  chatsLoading: false,
};

const chatSlice = createSlice({
  name: "chat",
  reducerPath: "chat",
  initialState,
  reducers: {
    addChat: (state, action) => {
      if (action.payload._id) {
        const existingChat = state.chats.find(
          (chat) => chat._id === action.payload._id
        );

        if (!existingChat) {
          state.chats.unshift(action.payload);
        }
      }
    },
    removeChat: (state, action) => {
      if (action.payload.chatId) {
        state.chats = state.chats.filter(
          (chat: Chat) => chat._id !== action.payload.chatId
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(chatApi.endpoints.getChats.matchPending, (state) => {
        state.chatsLoading = true;
      })
      .addMatcher(
        chatApi.endpoints.getChats.matchFulfilled,
        (state, action) => {
          state.chatsLoading = false;
          if (action.payload?.chats) {
            state.chats = action.payload.chats;
          }
        }
      )
      .addMatcher(chatApi.endpoints.getChats.matchFulfilled, (state) => {
        state.chatsLoading = false;
      });
  },
});

export const { addChat, removeChat } = chatSlice.actions;

export const selectChats = (state: RootState) => state.chat.chats;
export const selectChatsLoading = (state: RootState) => state.chat.chatsLoading;

export default chatSlice;
