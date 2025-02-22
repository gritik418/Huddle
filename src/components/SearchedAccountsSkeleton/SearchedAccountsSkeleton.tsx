import React, { JSX } from "react";
import { Skeleton } from "../ui/skeleton";

const SearchedAccountsSkeleton = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex p-3 gap-2 bg-gray-100 items-center rounded-lg">
        <Skeleton className="flex h-14 min-w-14 rounded-full bg-gray-300" />

        <div className="flex flex-col w-full gap-2">
          <Skeleton className="bg-gray-300 h-5 w-[120px]" />

          <Skeleton className="bg-gray-300 h-4 w-[80px]" />
        </div>
      </div>

      <div className="flex p-3 gap-2 bg-gray-100 items-center rounded-lg">
        <Skeleton className="flex h-14 min-w-14 rounded-full bg-gray-300" />

        <div className="flex flex-col w-full gap-2">
          <Skeleton className="bg-gray-300 h-5 w-[160px]" />

          <Skeleton className="bg-gray-300 h-4 w-[100px]" />
        </div>
      </div>

      <div className="flex p-3 gap-2 bg-gray-100 items-center rounded-lg">
        <Skeleton className="flex h-14 min-w-14 rounded-full bg-gray-300" />

        <div className="flex flex-col w-full gap-2">
          <Skeleton className="bg-gray-300 h-5 w-[100px]" />

          <Skeleton className="bg-gray-300 h-4 w-[60px]" />
        </div>
      </div>

      <div className="flex p-3 gap-2 bg-gray-100 items-center rounded-lg">
        <Skeleton className="flex h-14 min-w-14 rounded-full bg-gray-300" />

        <div className="flex flex-col w-full gap-2">
          <Skeleton className="bg-gray-300 h-5 w-[170px]" />

          <Skeleton className="bg-gray-300 h-4 w-[90px]" />
        </div>
      </div>
    </div>
  );
};

export default SearchedAccountsSkeleton;
