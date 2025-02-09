import { createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
import { RootState } from "@/app/store";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  reducerPath: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, action) => {
        if (action.payload.success) {
          if (action.payload.user) {
            state.user = action.payload.user;
          }
        }
      }
    );
  },
});

export const selectUser = (state: RootState) => state.user.user;

export default userSlice;
