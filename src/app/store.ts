import authApi from "@/features/api/authAPI";
import { configureStore } from "@reduxjs/toolkit";
import chatRequestSlice from "@/features/chatRequest/chatRequestSlice";
import chatRequestApi from "@/features/api/chatRequestApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [chatRequestApi.reducerPath]: chatRequestApi.reducer,
    [chatRequestSlice.reducerPath]: chatRequestSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(chatRequestApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
