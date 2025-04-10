"use client";
import Image from "next/image";
import { JSX } from "react";
import { useSelector } from "react-redux";
import { selectOwnStories } from "../../features/story/storySlice";
import { selectUser } from "../../features/user/userSlice";

const OwnStoryTrigger = (): JSX.Element => {
  const user: User | null = useSelector(selectUser);
  const ownStories = useSelector(selectOwnStories);

  const count = ownStories?.length || 0;
  const degreePerStory = 360 / count;
  const segments: string[] = [];

  for (let i = 0; i < count; i++) {
    const start = i * degreePerStory;
    const end = count === 1 ? 360 : start + degreePerStory * 0.95;
    segments.push(`#00aaf0 ${start}deg ${end}deg`);
    if (count > 1) {
      segments.push(`transparent ${end}deg ${(i + 1) * degreePerStory}deg`);
    }
  }

  const borderStyle =
    count > 0
      ? {
          background: `conic-gradient(${segments.join(", ")})`,
        }
      : {};

  return (
    <div
      className="h-[70px] w-[70px] relative rounded-full p-[2px]"
      style={borderStyle}
    >
      <div className="h-full w-full rounded-full bg-white p-[2px]">
        <Image
          src={user?.profilePicture || "/images/default-profile.jpg"}
          alt="avatar"
          height={64}
          width={64}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default OwnStoryTrigger;
