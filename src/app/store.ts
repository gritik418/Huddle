import { authApi } from "@/features/api/authAPI";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
