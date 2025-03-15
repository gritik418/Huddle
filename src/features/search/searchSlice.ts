import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { search } from "./searchAPI";
import { RootState } from "@/app/store";

interface SearchState {
  accounts: SearchedUserForChat[];
  channels: [];
  loading: boolean;
  userIds: string[];
  pagination?: { page: number; limit: number; totalPages: number };
}

const initialState: SearchState = {
  accounts: [],
  channels: [],
  userIds: [],
  loading: false,
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
  reducers: {},
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
          }
          if (action.payload.channels) {
            state.channels = action.payload.channels;
          }
          if (action.payload.pagination) {
            state.pagination = action.payload.pagination;
          }
        }
      })
      .addCase(searchAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectSearchedAccounts = (state: RootState) =>
  state.search.accounts;
export const selectSearchLoading = (state: RootState) => state.search.loading;
export const selectSearchPagination = (state: RootState) =>
  state.search.pagination;

export default searchSlice;
