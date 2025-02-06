import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or username is required.")
    .refine((val) => emailRegex.test(val) || usernameRegex.test(val), {
      message: "Please provide a valid email or username.",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(20, "Password can't exceed 20 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[\W_]/,
      "Password must contain at least one special character (e.g., @, #, $, etc.)."
    ),
});

export type LoginData = z.infer<typeof loginSchema>;

export default loginSchema;
