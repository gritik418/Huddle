import { JSX } from "react";
import { useSelector } from "react-redux";
import { selectOwnStories } from "../../features/story/storySlice";
import OwnStoryModal from "../OwnStoryModal/OwnStoryModal";
import StoryItem from "../StoryItem/StoryItem";

const StoriesContainer = (): JSX.Element => {
  const ownStories = useSelector(selectOwnStories);

  console.log(ownStories);

  return (
    <div className="flex w-full min-h-24 bg-white px-4 items-center rounded-lg">
      {/* {<AddStoryModal />} */}
      {<OwnStoryModal />}
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
