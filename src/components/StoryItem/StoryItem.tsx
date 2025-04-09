"use client";
import { Dialog, Portal } from "@chakra-ui/react";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";

interface Props {
  user: Follower;
  stories: Story[];
}

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

const StoryItemModal = ({ user, stories }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentStory = stories[currentIndex];

  useEffect(() => {
    if (!isOpen || !currentStory) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const timeout = setTimeout(() => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsOpen(false);
        setCurrentIndex(0);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isOpen, currentIndex, currentStory, stories.length]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsOpen(false);
      setCurrentIndex(0);
    }
  };

  const count = stories?.length || 0;
  const degreePerStory = 360 / count;
  const segments: string[] = [];

  for (let i = 0; i < count; i++) {
    const start = i * degreePerStory;
    const end = start + degreePerStory * 0.95;
    segments.push(`#22c55e ${start}deg ${end}deg`);
    segments.push(`transparent ${end}deg ${(i + 1) * degreePerStory}deg`);
  }

  const borderStyle =
    count > 0
      ? {
          background: `conic-gradient(${segments.join(", ")})`,
        }
      : {};

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => setIsOpen(details.open)}
    >
      <Dialog.Trigger>
        <div
          className="relative h-14 w-14 rounded-full p-[2px]"
          style={borderStyle}
        >
          <Image
            src={user?.profilePicture || "/images/default-profile.jpg"}
            alt="avatar"
            height={56}
            width={56}
            className="h-full w-full object-cover rounded-full"
          />
        </div>
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
                {stories.map((_, index) => (
                  <div
                    key={index}
                    className="h-1 flex-1 rounded-full bg-gray-300 overflow-hidden"
                  >
                    <div
                      className="h-full bg-[var(--secondary)] transition-all duration-100"
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

              {user._id && (
                <div className="flex self-start absolute gap-1 m-1 overflow-hidden">
                  <div className="flex h-9 w-9 rounded-full">
                    <Image
                      src={
                        user?.profilePicture || "/images/default-profile.jpg"
                      }
                      alt="avatar"
                      height={50}
                      width={50}
                      className="h-full w-full rounded-full"
                    />
                  </div>

                  <div className="flex flex-col text-white">
                    <p className="text-sm">
                      {user.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs font-semibold">@{user.username}</p>
                  </div>
                </div>
              )}
              {currentStory?.createdAt && (
                <div className="flex self-end absolute gap-1 m-1 text-[11px] text-gray-600 bg-white/70 backdrop-blur px-2 py-1 rounded-full">
                  {getTimeAgo(currentStory.createdAt)}
                </div>
              )}

              {currentStory ? (
                <>
                  {currentStory.mediaType === "image" &&
                  currentStory.mediaUrl ? (
                    <Image
                      src={currentStory?.mediaUrl}
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
                    {currentIndex + 1} / {stories.length}
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

export default StoryItemModal;
