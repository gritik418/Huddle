import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { search } from "./searchAPI";
import { RootState } from "@/app/store";

interface SearchState {
  accounts: SearchedUserForChat[];
  posts: Post[];
  channels: Channel[];
  channelIds: string[];
  loading: boolean;
  userIds: string[];
  postIds: string[];
  pagination?: { page: number; limit: number; totalPages: number };
  postPagination?: { page: number; limit: number; totalPages: number };
}

const initialState: SearchState = {
  accounts: [],
  channels: [],
  userIds: [],
  postIds: [],
  posts: [],
  loading: false,
  channelIds: [],
};

export const searchAsync = createAsyncThunk(
  "searchAsync",
  async ({
    searchQuery,
    type,
    page,
    limit,
  }: {
    searchQuery: string;
    type: string;
    page: number;
    limit: number;
  }) => {
    const result = await search(searchQuery, type, page, limit);
    return result;
  }
);

const searchSlice = createSlice({
  name: "search",
  reducerPath: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.postIds = [];
      state.posts = [];
      state.accounts = [];
      state.userIds = [];
      state.pagination = undefined;
      state.channelIds = [];
      state.channels = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          if (action.payload.users) {
            action.payload.users.forEach((user: User) => {
              if (!state.userIds.includes(user._id.toString())) {
                state.userIds.push(user._id.toString());
                state.accounts.push(user);
              }
            });

            state.pagination = action.payload.pagination;
          }

          if (action.payload.posts) {
            action.payload.posts.forEach((post: Post) => {
              if (!state.postIds.includes(post._id.toString())) {
                state.postIds.push(post._id.toString());
                state.posts.push(post);
              }
            });

            if (action.payload.pagination) {
              state.postPagination = action.payload.pagination;
            }
          }

          if (action.payload.channels) {
            action.payload.channels.forEach((channel: Channel) => {
              if (!state.channelIds.includes(channel._id.toString())) {
                state.channelIds.push(channel._id.toString());
                state.channels.push(channel);
              }
            });

            state.pagination = action.payload.pagination;
          }
        }
      })
      .addCase(searchAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearSearch } = searchSlice.actions;

export const selectSearchedAccounts = (state: RootState) =>
  state.search.accounts;
export const selectSearchedPosts = (state: RootState) => state.search.posts;
export const selectSearchedChannels = (state: RootState) =>
  state.search.channels;
export const selectSearchLoading = (state: RootState) => state.search.loading;
export const selectSearchPagination = (state: RootState) =>
  state.search.pagination;
export const selectSearchPostsPagination = (state: RootState) =>
  state.search.postPagination;

export default searchSlice;
