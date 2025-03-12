import { configureStore } from "@reduxjs/toolkit";
import chatRequestSlice from "@/features/chatRequest/chatRequestSlice";
import chatRequestApi from "@/features/api/chatRequestApi";
import chatApi from "@/features/api/chatApi";
import authApi from "@/features/api/authApi";
import userApi from "@/features/api/userApi";
import userSlice from "@/features/user/userSlice";
import messageApi from "@/features/api/messageApi";
import messageSlice from "@/features/message/messageSlice";
import chatSlice from "@/features/chat/chatSlice";
import searchSlice from "@/features/search/searchSlice";
import followRequestApi from "@/features/api/followRequestApi";
import followRequestSlice from "@/features/followRequest/followRequestSlice";
import groupApi from "@/features/api/groupApi";
import postApi from "@/features/api/postApi";
import postSlice from "@/features/post/postSlice";
import authSlice from "@/features/auth/authSlice";
import accountSettingsApi from "@/features/api/accountSettingsApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [chatRequestApi.reducerPath]: chatRequestApi.reducer,
    [followRequestApi.reducerPath]: followRequestApi.reducer,
    [accountSettingsApi.reducerPath]: accountSettingsApi.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [postSlice.reducerPath]: postSlice.reducer,
    [chatSlice.reducerPath]: chatSlice.reducer,
    [searchSlice.reducerPath]: searchSlice.reducer,
    [messageSlice.reducerPath]: messageSlice.reducer,
    [chatRequestSlice.reducerPath]: chatRequestSlice.reducer,
    [followRequestSlice.reducerPath]: followRequestSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(chatApi.middleware)
      .concat(postApi.middleware)
      .concat(groupApi.middleware)
      .concat(messageApi.middleware)
      .concat(chatRequestApi.middleware)
      .concat(followRequestApi.middleware)
      .concat(accountSettingsApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
