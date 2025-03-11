import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  signupEmail: string | null;
}

const initialState: AuthState = {
  signupEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  reducerPath: "auth",
  initialState,
  reducers: {
    setSignupEmail: (state, action) => {
      if (action.payload) {
        state.signupEmail = action.payload;
      }
    },
  },
});

export const { setSignupEmail } = authSlice.actions;

export const selectSignupEmail = (state: RootState) => state.auth.signupEmail;

export default authSlice;
