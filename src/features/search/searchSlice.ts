import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { search } from "./searchAPI";
import { RootState } from "@/app/store";

interface SearchState {
  accounts: SearchedUserForChat[];
  channels: [];
  loading: boolean;
}

const initialState: SearchState = {
  accounts: [],
  channels: [],
  loading: false,
};

export const searchAsync = createAsyncThunk(
  "searchAsync",
  async ({ searchQuery, type }: { searchQuery: string; type: string }) => {
    const result = await search(searchQuery, type);
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
            state.accounts = action.payload.users;
          }
          if (action.payload.channels) {
            state.channels = action.payload.channels;
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

export default searchSlice;
