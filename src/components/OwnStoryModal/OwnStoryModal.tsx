"use client";
import { Dialog, Portal } from "@chakra-ui/react";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectOwnStories } from "../../features/story/storySlice";
import OwnStoryTrigger from "../OwnStoryTrigger/OwnStoryTrigger";

const OwnStoryModal = (): JSX.Element => {
  const ownStories = useSelector(selectOwnStories);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentStory = ownStories?.[currentIndex];

  useEffect(() => {
    if (!isOpen || !currentStory) return;

    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const timeout = setTimeout(() => {
      if (currentIndex < ownStories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsOpen(false);
        setCurrentIndex(0);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [isOpen, currentIndex, currentStory, ownStories.length]);

  const handleNext = () => {
    if (currentIndex < ownStories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsOpen(false);
      setCurrentIndex(0);
    }
  };

  const getTimeAgo = (dateString: string): string => {
    const createdAt = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - createdAt.getTime();

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInHours < 1)
      return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => setIsOpen(details.open)}
      placement="center"
    >
      <Dialog.Trigger>
        <OwnStoryTrigger />
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="max-w-[400px] w-full rounded-2xl shadow-xl bg-white p-2 py-6 text-black">
            <Dialog.Body
              onClick={handleNext}
              className="flex flex-col items-center gap-4 relative"
            >
              <div className="flex gap-1 absolute -top-2 mb-3 left-2 right-2 z-10">
                {ownStories.map((_, index) => (
                  <div
                    key={index}
                    className="h-1 flex-1 rounded-full bg-gray-300 overflow-hidden"
                  >
                    <div
                      className={`h-full bg-[var(--secondary)] transition-all duration-100`}
                      style={{
                        width:
                          index < currentIndex
                            ? "100%"
                            : index === currentIndex
                            ? `${progress}%`
                            : "0%",
                      }}
                    />
                  </div>
                ))}
              </div>

              {currentStory?.createdAt && (
                <div className="absolute top-2 right-4 text-[11px] text-gray-600 z-20 bg-gray-200 backdrop-blur px-2 py-1 rounded-full">
                  {getTimeAgo(currentStory.createdAt)}
                </div>
              )}

              {currentStory ? (
                <>
                  {currentStory.mediaType === "image" ? (
                    <Image
                      src={currentStory.mediaUrl || ""}
                      alt="Story"
                      height={400}
                      width={400}
                      className="w-full h-[400px] object-cover rounded-xl"
                    />
                  ) : (
                    <video
                      src={currentStory.mediaUrl}
                      className="w-full h-[400px] rounded-xl"
                      controls
                      autoPlay
                      muted
                    />
                  )}
                  {currentStory.caption && (
                    <p className="text-center text-sm opacity-90">
                      {currentStory.caption}
                    </p>
                  )}

                  <div className="text-xs text-black">
                    {currentIndex + 1} / {ownStories.length}
                  </div>
                </>
              ) : (
                <p>No stories to show.</p>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default OwnStoryModal;
