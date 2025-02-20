import { z } from "zod";

const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters long.")
    .max(50, "First name can't exceed 50 characters.")
    .optional(),
  lastName: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.length <= 50, {
      message: "Last name can't exceed 50 characters.",
    }),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(15, "Username can't exceed 15 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores."
    )
    .optional(),
  bio: z.string().max(300, "Bio can't exceed 300 characters.").optional(),
  coverImage: z.any().optional(),
  profilePicture: z.any().optional(),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;

export default updateUserSchema;
