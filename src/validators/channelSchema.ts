import { z } from "zod";

const ChannelSchema = z.object({
  name: z
    .string()
    .min(3, "Channel name must be atleast 3 characters long.")
    .max(20, "Channel name can't exceed 20 characters."),
  description: z
    .string()
    .min(10, "Description must be atleast 10 characters long.")
    .max(200, "Description can't exceed 200 characters."),
  sendMessagePermission: z.enum(["creator", "members", "everyone"], {
    message: "Expected 'creator', 'members' or 'everyone'.",
  }),
  type: z.enum(["public", "private", "invite-only"], {
    message: "Expected 'public', 'private'or 'invite-only'.",
  }),
});

export type ChannelData = z.infer<typeof ChannelSchema>;

export default ChannelSchema;
