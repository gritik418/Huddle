import authApi from "@/features/api/authAPI";
import { configureStore } from "@reduxjs/toolkit";
import chatRequestSlice from "@/features/chatRequest/chatRequestSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [chatRequestSlice.reducerPath]: chatRequestSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
