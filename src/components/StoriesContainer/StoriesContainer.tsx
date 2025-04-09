import { Menu, Portal } from "@chakra-ui/react";
import AddStoryModal from "../AddStoryModal/AddStoryModal";
import StoryItem from "../StoryItem/StoryItem";
import { useSelector } from "react-redux";
import { JSX, useState } from "react";
import { selectOwnStories } from "../../features/story/storySlice";
import OwnStoryModal from "../OwnStoryModal/OwnStoryModal";
import Image from "next/image";
import { selectUser } from "../../features/user/userSlice";
import { FaPlus } from "react-icons/fa";

const StoriesContainer = (): JSX.Element => {
  const user: User | null = useSelector(selectUser);
  const ownStories = useSelector(selectOwnStories);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  return (
    <div className="flex w-full min-h-24 bg-white px-4 items-center rounded-lg">
      <Menu.Root>
        <Menu.ContextTrigger as="div">
          {ownStories.length > 0 ? (
            <OwnStoryModal />
          ) : (
            <div
              onClick={() => setIsAddModalOpen(true)}
              className="h-16 relative w-16 rounded-full p-[2px]"
            >
              <div className="h-full w-full rounded-full bg-white">
                <Image
                  src={user?.profilePicture || "/images/default-profile.jpg"}
                  alt="avatar"
                  height={64}
                  width={64}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <span className="h-5 w-5 flex cursor-pointer items-center justify-center text-white p-1s absolute bottom-0 right-0 rounded-full bg-green-500">
                <FaPlus className="text-xs" />
              </span>
            </div>
          )}
        </Menu.ContextTrigger>

        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item
                value="new-txt"
                onClick={() => setIsAddModalOpen(true)}
              >
                Add a story
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <div className="h-12 border-[1px] border-gray-200 mx-3"></div>

      <div className="flex gap-2 w-[calc(100%-90px)] overflow-x-scroll hide-scrollbar">
        {[...Array(30)].map((_, i) => (
          <StoryItem key={i} />
        ))}
      </div>

      <AddStoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default StoriesContainer;
