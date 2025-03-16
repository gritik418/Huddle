import { z } from "zod";

const postSchema = z
  .object({
    content: z.string().min(1).optional(),
    location: z.string().optional(),
    media: z.any().optional(),
  })
  .refine((data) => data.content || (data.media && data.media.length > 0), {
    message: "You must add content or media to post.",
    path: ["content"],
  });

export type PostData = z.infer<typeof postSchema>;

export default postSchema;
