import { createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
import { RootState } from "@/app/store";

interface UserState {
  user: User | null;
  onlineMembers: string[];
  followings: Follower[];
}

const initialState: UserState = {
  user: null,
  onlineMembers: [],
  followings: [],
};

const userSlice = createSlice({
  name: "user",
  reducerPath: "user",
  initialState,
  reducers: {
    addOnlineMember: (state, action) => {
      const alreadyAdded: boolean = state.onlineMembers.includes(
        action.payload.userId
      );
      if (!alreadyAdded) {
        state.onlineMembers.push(action.payload.userId);
      }
    },
    removeOnlineMember: (state, action) => {
      state.onlineMembers = state.onlineMembers.filter(
        (memberId: string) => memberId.toString() !== action.payload.userId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, action) => {
        if (action.payload.success) {
          if (action.payload.user) {
            state.user = action.payload.user;
          }
        }
      })
      .addMatcher(
        userApi.endpoints.getActiveMembers.matchFulfilled,
        (state, action) => {
          action.payload.activeMembers?.forEach((member: string) => {
            if (!state.onlineMembers.includes(member)) {
              state.onlineMembers.push(member);
            }
          });
        }
      )
      .addMatcher(
        userApi.endpoints.getFollowing.matchFulfilled,
        (state, action) => {
          if (action.payload.success) {
            state.followings = action.payload.following || [];
          }
        }
      );
  },
});

export const { addOnlineMember, removeOnlineMember } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectFollowings = (state: RootState) => state.user.followings;
export const selectOnlineMembers = (state: RootState) =>
  state.user.onlineMembers;

export default userSlice;
