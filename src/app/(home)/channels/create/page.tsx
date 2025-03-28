import CreatorInfo from "@/components/CreatorInfo/CreatorInfo";
import InviteMembers from "@/components/InviteMembers/InviteMembers";
import { SelectChannelType } from "@/components/SelectChannelType/SelectChannelType";
import SelectMessagePermission from "@/components/SelectMessagePermission/SelectMessagePermission";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

const CreateChannelPage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-56px-16px-24px)] w-full gap-3 bg-white rounded-lg p-6">
      <h1 className="text-2xl font-medium mx-auto">Create a new Channel</h1>

      <div className="flex flex-col mt-8 gap-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CreatorInfo />
            </TooltipTrigger>
            <TooltipContent>
              <p>Creator</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col gap-1">
          <label htmlFor="channelName" className="text-lg">
            Channel Name
          </label>
          <input
            type="text"
            name="name"
            className="border-2 bg-gray-50 rounded-md p-2 outline-[var(--secondary)]"
            id="channelName"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="channelDescription" className="text-lg">
            Channel Description
          </label>
          <textarea
            name="description"
            className="border-2 bg-gray-50 resize-none rounded-md p-2 outline-[var(--secondary)]"
            id="channelDescription"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="channelDescription" className="text-lg">
            Channel Type
          </label>

          <SelectChannelType />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="channelDescription" className="text-lg">
            Select who can send messages
          </label>

          <SelectMessagePermission />
        </div>

        <InviteMembers />
      </div>
    </div>
  );
};

export default CreateChannelPage;
