"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ChannelData } from "@/validators/channelSchema";

type PropsType = {
  setValue: UseFormSetValue<ChannelData>;
  getValues: UseFormGetValues<ChannelData>;
};

const SelectMessagePermission = ({ getValues, setValue }: PropsType) => {
  const [messagePermission, setMessagePermission] = useState<
    "creator" | "members" | "everyone"
  >("creator");

  const hint: Record<typeof messagePermission, string> = {
    creator: "Only the creator can send messages in this channel.",
    members: "Only the members can send messages in this channel.",
    everyone: "Everyone, both members and the creator, can send messages.",
  };

  const handleChange = (permission: typeof messagePermission) => {
    setMessagePermission(permission);
    setValue("sendMessagePermission", permission);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <Select
          defaultValue={getValues("sendMessagePermission")}
          onValueChange={handleChange}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select Message Permission" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="creator">Only Creator</SelectItem>
              <SelectItem value="members">Members</SelectItem>
              <SelectItem value="everyone">Everyone</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {messagePermission && (
          <span className="pt-2 pl-2 text-gray-500 text-xs">
            {hint[messagePermission]}
          </span>
        )}
      </div>
    </div>
  );
};

export default SelectMessagePermission;
