import { z } from "zod";

const postSchema = z.object({
  content: z.string().min(1, "Content is required."),
  location: z.string().optional(),
  media: z.any().optional(),
});

export type PostData = z.infer<typeof postSchema>;

export default postSchema;
