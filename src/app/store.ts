import { configureStore } from "@reduxjs/toolkit";
import chatRequestSlice from "../features/chatRequest/chatRequestSlice";
import chatRequestApi from "../features/api/chatRequestApi";
import chatApi from "../features/api/chatApi";
import authApi from "../features/api/authApi";
import userApi from "../features/api/userApi";
import userSlice from "../features/user/userSlice";
import messageApi from "../features/api/messageApi";
import messageSlice from "../features/message/messageSlice";
import chatSlice from "../features/chat/chatSlice";
import searchSlice from "../features/search/searchSlice";
import followRequestApi from "../features/api/followRequestApi";
import followRequestSlice from "../features/followRequest/followRequestSlice";
import groupApi from "../features/api/groupApi";
import postApi from "../features/api/postApi";
import postSlice from "../features/post/postSlice";
import authSlice from "../features/auth/authSlice";
import accountSettingsApi from "../features/api/accountSettingsApi";
import pulseApi from "../features/api/pulseApi";
import pulseSlice from "../features/pulse/pulseSlice";
import blockUserApi from "../features/api/blockUserApi";
import channelApi from "../features/api/channelApi";
import channelSlice from "../features/channel/channelSlice";
import joinRequestApi from "../features/api/joinRequestApi";
import channelInviteApi from "../features/api/channelInviteApi";
import channelInvitesSlice from "../features/channelInvites/channelInvitesSlice";
import storyApi from "../features/api/storyApi";
import storySlice from "../features/story/storySlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [storyApi.reducerPath]: storyApi.reducer,
    [pulseApi.reducerPath]: pulseApi.reducer,
    [channelApi.reducerPath]: channelApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [blockUserApi.reducerPath]: blockUserApi.reducer,
    [chatRequestApi.reducerPath]: chatRequestApi.reducer,
    [joinRequestApi.reducerPath]: joinRequestApi.reducer,
    [followRequestApi.reducerPath]: followRequestApi.reducer,
    [channelInviteApi.reducerPath]: channelInviteApi.reducer,
    [accountSettingsApi.reducerPath]: accountSettingsApi.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [postSlice.reducerPath]: postSlice.reducer,
    [chatSlice.reducerPath]: chatSlice.reducer,
    [pulseSlice.reducerPath]: pulseSlice.reducer,
    [storySlice.reducerPath]: storySlice.reducer,
    [searchSlice.reducerPath]: searchSlice.reducer,
    [messageSlice.reducerPath]: messageSlice.reducer,
    [channelSlice.reducerPath]: channelSlice.reducer,
    [chatRequestSlice.reducerPath]: chatRequestSlice.reducer,
    [followRequestSlice.reducerPath]: followRequestSlice.reducer,
    [channelInvitesSlice.reducerPath]: channelInvitesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(chatApi.middleware)
      .concat(postApi.middleware)
      .concat(pulseApi.middleware)
      .concat(groupApi.middleware)
      .concat(storyApi.middleware)
      .concat(channelApi.middleware)
      .concat(messageApi.middleware)
      .concat(blockUserApi.middleware)
      .concat(chatRequestApi.middleware)
      .concat(joinRequestApi.middleware)
      .concat(channelInviteApi.middleware)
      .concat(followRequestApi.middleware)
      .concat(accountSettingsApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
