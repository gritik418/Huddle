"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { selectOwnStories } from "../../features/story/storySlice";
import { JSX } from "react";

const OwnStoryTrigger = (): JSX.Element => {
  const user: User | null = useSelector(selectUser);
  const ownStories = useSelector(selectOwnStories);

  const count = ownStories?.length || 0;
  const degreePerStory = 360 / count;
  const segments: string[] = [];

  for (let i = 0; i < count; i++) {
    const start = i * degreePerStory;
    const end = start + degreePerStory * 0.95; // tighter gaps
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
    <div className="h-16 w-16 rounded-full p-[2px]" style={borderStyle}>
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
