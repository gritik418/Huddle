import React, { JSX } from "react";
import { Skeleton } from "../ui/skeleton";

const PostSkeleton = (): JSX.Element => {
  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center border-b-[1px] border-gray-100 p-3 justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-12 w-12 rounded-full gap-2">
            <Skeleton className="rounded-full h-full w-full bg-gray-200" />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-4 w-[200px] bg-gray-200" />

            <Skeleton className="h-4 w-[120px] bg-gray-200" />
          </div>
        </div>

        <div className="flex">
          <Skeleton className="h-6 w-2 bg-gray-200" />
        </div>
      </div>

      <div className="p-3">
        <Skeleton className="h-5 w-[300px] bg-gray-200" />
      </div>

      <div className="flex items-center justify-center">
        <Skeleton className="h-[200px] w-[360px] bg-gray-200" />
      </div>

      <div className="flex p-3 gap-3">
        <Skeleton className="h-8 w-8 bg-gray-200" />

        <Skeleton className="h-8 w-8 bg-gray-200" />
      </div>
    </div>
  );
};

export default PostSkeleton;
