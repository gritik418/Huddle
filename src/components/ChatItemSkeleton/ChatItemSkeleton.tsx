import React, { JSX } from "react";
import { Skeleton } from "../ui/skeleton";

const ChatItemSkeleton = (): JSX.Element => {
  return (
    <div className="flex items-center p-2 my-2 w-full gap-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
};

export default ChatItemSkeleton;
