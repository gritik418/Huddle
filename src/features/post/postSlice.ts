import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { getFeed } from "./postAPI";

interface PostState {
  feedLoading: boolean;
  feed: Post[];
  postIds: string[];
  pagination?: { page: number; limit: number; totalPages: number };
}

const initialState: PostState = {
  feed: [],
  postIds: [],
  feedLoading: false,
};

export const getFeedAsync = createAsyncThunk(
  "post/getFeed",
  async ({ limit, page }: { limit: number; page: number }) => {
    console.log(page, limit);
    const response = await getFeed(limit, page);
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
      });
  },
});

export const selectFeed = (state: RootState) => state.post.feed;
export const selectPagination = (state: RootState) => state.post.pagination;
export const selectFeedLoading = (state: RootState) => state.post.feedLoading;

export default postSlice;
