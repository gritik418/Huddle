import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectChannelType() {
  return (
    <Select defaultValue="public">
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Select Channel Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Channel Types</SelectLabel>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
          <SelectItem value="invite-only">Invite Only</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
