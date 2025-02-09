import authApi from "@/features/api/authApi";
import { configureStore } from "@reduxjs/toolkit";
import chatRequestSlice from "@/features/chatRequest/chatRequestSlice";
import chatRequestApi from "@/features/api/chatRequestApi";
import chatApi from "@/features/api/chatApi";
import userApi from "@/features/api/userApi";
import userSlice from "@/features/user/userSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [chatRequestApi.reducerPath]: chatRequestApi.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [chatRequestSlice.reducerPath]: chatRequestSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(chatApi.middleware)
      .concat(chatRequestApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
