import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ChannelData } from "@/validators/channelSchema";

type PropsType = {
  setValue: UseFormSetValue<ChannelData>;
  getValues: UseFormGetValues<ChannelData>;
};

export function SelectChannelType({ getValues, setValue }: PropsType) {
  const handleChange = (value: "public" | "private" | "invite-only") => {
    setValue("type", value);
  };
  return (
    <Select defaultValue={getValues("type")} onValueChange={handleChange}>
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
