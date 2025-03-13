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
    updateLastMessage: (state, action) => {
      state.chats = state.chats.map((chat: Chat) => {
        if (chat._id === action.payload.chatId) {
          return {
            ...chat,
            lastMessage: action.payload.lastMessage,
            updatedAt: new Date().toISOString(),
          };
        } else {
          return chat;
        }
      });
    },
    removeLastMessage: (state, action) => {
      state.chats = state.chats.map((chat: Chat) => {
        if (chat._id === action.payload.chatId) {
          if (chat.lastMessage?._id === action.payload.lastMessage._id) {
            return { ...chat, lastMessage: undefined };
          } else {
            return chat;
          }
        } else {
          return chat;
        }
      });
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

export const { addChat, removeChat, updateLastMessage, removeLastMessage } =
  chatSlice.actions;

export const selectChats = (state: RootState) => state.chat.chats;
export const selectChatsLoading = (state: RootState) => state.chat.chatsLoading;

export default chatSlice;
