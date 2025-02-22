import React, { JSX } from "react";
import { Skeleton } from "../ui/skeleton";

const MessagePlaygroundSkeleton = (): JSX.Element => {
  return (
    <div className="p-4 h-[calc(100%-64px-80px)] overflow-y-scroll pb-4 bg-[#f2f2f2] flex-col">
      <div className="flex my-2 items-start gap-1">
        <Skeleton className="h-5 w-5 rounded-full bg-gray-300" />
        <div className="rounded-tr-3xl rounded-br-3xl rounded-bl-3xl">
          <Skeleton className="h-8 rounded-r-3xl rounded-bl-3xl w-[290px] bg-gray-300" />
        </div>
      </div>

      <div className="w-max ml-auto max-w-[85%] p-2 px-4 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl">
        <Skeleton className="h-8 rounded-l-3xl rounded-br-3xl w-[150px] bg-gray-300" />
      </div>

      <div className="w-max ml-auto max-w-[85%] p-2 px-4 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl">
        <Skeleton className="h-8 rounded-l-3xl rounded-br-3xl w-[250px] bg-gray-300" />
      </div>

      <div className="flex my-2 items-start gap-1">
        <Skeleton className="h-5 w-5 rounded-full bg-gray-300" />
        <div className="rounded-tr-3xl rounded-br-3xl rounded-bl-3xl">
          <Skeleton className="h-8 rounded-r-3xl rounded-bl-3xl w-[250px] bg-gray-300" />
        </div>
      </div>

      <div className="w-max ml-auto max-w-[85%] p-2 px-4 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl">
        <Skeleton className="h-8 rounded-l-3xl rounded-br-3xl w-[250px] bg-gray-300" />
      </div>

      <div className="flex my-2 items-start gap-1">
        <Skeleton className="h-5 w-5 rounded-full bg-gray-300" />
        <div className="rounded-tr-3xl rounded-br-3xl rounded-bl-3xl">
          <Skeleton className="h-8 rounded-r-3xl rounded-bl-3xl w-[100px] bg-gray-300" />
        </div>
      </div>

      <div className="flex my-2 items-start gap-1">
        <Skeleton className="h-5 w-5 rounded-full bg-gray-300" />
        <div className="rounded-tr-3xl rounded-br-3xl rounded-bl-3xl">
          <Skeleton className="h-8 rounded-r-3xl rounded-bl-3xl w-[190px] bg-gray-300" />
        </div>
      </div>

      <div className="w-max ml-auto max-w-[85%] p-2 px-4 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl">
        <Skeleton className="h-8 rounded-l-3xl rounded-br-3xl w-[180px] bg-gray-300" />
      </div>
    </div>
  );
};

export default MessagePlaygroundSkeleton;
