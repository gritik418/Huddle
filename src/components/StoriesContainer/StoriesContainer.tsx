import React, { JSX } from "react";
import StoryItem from "../StoryItem/StoryItem";
import AddStory from "../AddStory/AddStory";

const StoriesContainer = (): JSX.Element => {
  return (
    <div className="flex w-full h-20 bg-white px-4 items-center rounded-lg">
      <AddStory />
      <div className="h-12 border-[1px] border-gray-200 mx-3"></div>

      <div className="flex gap-2 w-[calc(100%-90px)] overflow-x-scroll hide-scrollbar">
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
      </div>
    </div>
  );
};

export default StoriesContainer;
