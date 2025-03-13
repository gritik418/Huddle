import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { getFeed, getPostsByFollowings } from "./postAPI";

interface PostState {
  feedLoading: boolean;
  feed: Post[];
  postIds: string[];
  pagination?: { page: number; limit: number; totalPages: number };
  postsByFollowings: Post[];
  postsByFollowingsLoading: boolean;
  postsByFollowingsIds: string[];
  postsByFollowingsPagination?: {
    page: number;
    limit: number;
    totalPages: number;
  };
}

const initialState: PostState = {
  feed: [],
  postIds: [],
  feedLoading: false,
  postsByFollowings: [],
  postsByFollowingsLoading: false,
  postsByFollowingsIds: [],
};

export const getFeedAsync = createAsyncThunk(
  "post/getFeed",
  async ({ limit, page }: { limit: number; page: number }) => {
    const response = await getFeed(limit, page);
    return response;
  }
);

export const getPostsByFollowingsAsync = createAsyncThunk(
  "post/getPostsByFollowings",
  async ({ limit, page }: { limit: number; page: number }) => {
    const response = await getPostsByFollowings(limit, page);
    return response;
  }
);

const postSlice = createSlice({
  name: "post",
  reducerPath: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedAsync.pending, (state) => {
        state.feedLoading = true;
      })
      .addCase(getFeedAsync.fulfilled, (state, action) => {
        state.feedLoading = false;
        if (action.payload.success) {
          if (action.payload.posts) {
            action.payload.posts.forEach((post: Post) => {
              if (!state.postIds.includes(post._id.toString())) {
                state.postIds.push(post._id.toString());
                state.feed.push(post);
              }
            });
          }
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(getFeedAsync.rejected, (state) => {
        state.feedLoading = false;
      })
      .addCase(getPostsByFollowingsAsync.pending, (state) => {
        state.postsByFollowingsLoading = true;
      })
      .addCase(getPostsByFollowingsAsync.fulfilled, (state, action) => {
        state.postsByFollowingsLoading = false;
        if (action.payload.success) {
          if (action.payload.posts) {
            action.payload.posts.forEach((post: Post) => {
              if (!state.postsByFollowingsIds.includes(post._id.toString())) {
                state.postsByFollowingsIds.push(post._id.toString());
                state.postsByFollowings.push(post);
              }
            });
          }
          state.postsByFollowingsPagination = action.payload.pagination;
        }
      })
      .addCase(getPostsByFollowingsAsync.rejected, (state) => {
        state.postsByFollowingsLoading = false;
      });
  },
});

export const selectFeed = (state: RootState) => state.post.feed;
export const selectPagination = (state: RootState) => state.post.pagination;
export const selectFeedLoading = (state: RootState) => state.post.feedLoading;
export const selectPostByFollowingsLoading = (state: RootState) =>
  state.post.postsByFollowingsLoading;
export const selectPostByFollowings = (state: RootState) =>
  state.post.postsByFollowings;
export const selectPostByFollowingsPagination = (state: RootState) =>
  state.post.postsByFollowingsPagination;

export default postSlice;
