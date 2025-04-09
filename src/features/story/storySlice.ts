import { createSlice } from "@reduxjs/toolkit";
import storyApi from "../api/storyApi";
import { RootState } from "../../app/store";

interface StoryState {
  ownStories: Story[];
  followingsStories: { userId: string; stories: Story[] }[];
}

const initialState: StoryState = {
  ownStories: [],
  followingsStories: [],
};

const storySlice = createSlice({
  name: "story",
  reducerPath: "story",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addMatcher(
      storyApi.endpoints.getOwnStory.matchFulfilled,
      (state, action) => {
        if (action.payload.stories) {
          state.ownStories = action.payload.stories;
        }
      }
    ),
});

export const selectOwnStories = (state: RootState) => state.story.ownStories;
export const selectFollowingsStories = (state: RootState) =>
  state.story.followingsStories;

export default storySlice;
