import { z } from "zod";

const groupSchema = z.object({
  groupName: z
    .string()
    .min(1, "Group Name is required.")
    .min(3, "Group Name must be at least 3 characters long.")
    .max(20, "Group Name can't exceed 20 characters."),
  groupDescription: z
    .string()
    .min(1, "Group Description is required.")
    .min(3, "Group Description must be at least 3 characters long.")
    .max(200, "Group Description can't exceed 200 characters."),
});

export type GroupData = z.infer<typeof groupSchema>;

export default groupSchema;
