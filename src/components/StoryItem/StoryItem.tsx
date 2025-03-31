import Image from "next/image";
import { JSX } from "react";

const StoryItem = (): JSX.Element => {
  return (
    <div className="flex border-2 border-[var(--secondary)] p-[2px] min-w-[62px] h-[62px] rounded-full">
      <Image
        src={
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
        }
        alt="avatar"
        height={40}
        width={40}
        className="h-full w-full rounded-full object-cover"
      />
    </div>
  );
};

export default StoryItem;
