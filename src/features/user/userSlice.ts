import { createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
import { RootState } from "@/app/store";
import blockUserApi from "../api/blockUserApi";

interface UserState {
  user: User | null;
  onlineMembers: string[];
  followings: Follower[];
  followers: Follower[];
  blockedUsers: Follower[];
  blockedUserIds: string[];
}

const initialState: UserState = {
  user: null,
  onlineMembers: [],
  followings: [],
  followers: [],
  blockedUsers: [],
  blockedUserIds: [],
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
    toggleAllowMentions: (state, action) => {
      state.user = { ...state.user!, allowMentions: action.payload };
    },
    clearUser: (state) => {
      state.user = null;
      state.followers = [];
      state.followings = [];
      state.onlineMembers = [];
    },
    removeFromFollowing: (state, action) => {
      if (action.payload) {
        state.followings = state.followings.filter(
          (following: Follower) => following._id !== action.payload
        );

        if (state.user && state.user.following) {
          state.user.following = state.user.following.filter(
            (id: string) => id !== action.payload
          );
        }
      }
    },
    removeFromFollowers: (state, action) => {
      if (action.payload) {
        state.followers = state.followers.filter(
          (follower: Follower) => follower._id !== action.payload
        );

        if (state.user && state.user.followers) {
          state.user.followers = state.user.followers.filter(
            (id: string) => id !== action.payload
          );
        }
      }
    },
    addToBlockedUsers: (state, action) => {
      if (action.payload) {
        if (!state.blockedUserIds.includes(action.payload)) {
          state.blockedUserIds.push(action.payload);
        }
      }
    },
    removeFromBlockedUsers: (state, action) => {
      if (action.payload) {
        if (state.blockedUserIds.includes(action.payload)) {
          state.blockedUserIds = state.blockedUserIds.filter(
            (id: string) => id !== action.payload
          );
          state.blockedUsers = state.blockedUsers.filter(
            (user: Follower) => user._id !== action.payload
          );
        }
      }
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
      )
      .addMatcher(
        blockUserApi.endpoints.getBlockedUsers.matchFulfilled,
        (state, action) => {
          if (action.payload.success) {
            if (action.payload.blockedUsers) {
              action.payload.blockedUsers?.forEach((user: Follower) => {
                if (!state.blockedUserIds.includes(user._id)) {
                  state.blockedUserIds.push(user._id);
                  state.blockedUsers.push(user);
                }
              });
            }
          }
        }
      );
  },
});

export const {
  clearUser,
  togglePrivacy,
  addOnlineMember,
  addToBlockedUsers,
  removeOnlineMember,
  toggleActiveStatus,
  toggleAllowMentions,
  removeFromFollowing,
  removeFromFollowers,
  removeFromBlockedUsers,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectFollowers = (state: RootState) => state.user.followers;
export const selectFollowings = (state: RootState) => state.user.followings;
export const selectOnlineMembers = (state: RootState) =>
  state.user.onlineMembers;
export const selectBlockedUsers = (state: RootState) => state.user.blockedUsers;
export const selectBlockedUserIds = (state: RootState) =>
  state.user.blockedUserIds;

export default userSlice;
