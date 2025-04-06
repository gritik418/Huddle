import { JSX } from "react";
import StoryItem from "../StoryItem/StoryItem";
import AddStoryModal from "../AddStoryModal/AddStoryModal";

const StoriesContainer = (): JSX.Element => {
  return (
    <div className="flex w-full min-h-24 bg-white px-4 items-center rounded-lg">
      <AddStoryModal />
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
