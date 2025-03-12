import { createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
import { RootState } from "@/app/store";

interface UserState {
  user: User | null;
  onlineMembers: string[];
  followings: Follower[];
  followers: Follower[];
}

const initialState: UserState = {
  user: null,
  onlineMembers: [],
  followings: [],
  followers: [],
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
    togglePrivacy: (state, action) => {
      if (action.payload.privacy) {
        if (action.payload.privacy === "public") {
          state.user = { ...state.user!, isPrivate: false };
        }
        if (action.payload.privacy === "private") {
          state.user = { ...state.user!, isPrivate: true };
        }
      }
    },
    toggleActiveStatus: (state, action) => {
      state.user = { ...state.user!, showActiveStatus: action.payload };
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
        userApi.endpoints.getFollowings.matchFulfilled,
        (state, action) => {
          if (action.payload.success) {
            state.followings = action.payload.following || [];
          }
        }
      )
      .addMatcher(
        userApi.endpoints.getFollowers.matchFulfilled,
        (state, action) => {
          if (action.payload.success) {
            state.followers = action.payload.followers || [];
          }
        }
      );
  },
});

export const {
  addOnlineMember,
  removeOnlineMember,
  togglePrivacy,
  toggleActiveStatus,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectFollowers = (state: RootState) => state.user.followers;
export const selectFollowings = (state: RootState) => state.user.followings;
export const selectOnlineMembers = (state: RootState) =>
  state.user.onlineMembers;

export default userSlice;
