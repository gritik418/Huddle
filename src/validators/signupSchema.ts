import z, { RefinementCtx } from "zod";

const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required.")
      .min(3, "First name must be at least 3 characters long.")
      .max(50, "First name can't exceed 50 characters."),
    lastName: z
      .string()
      .optional()
      .refine((val) => val === undefined || val.length <= 50, {
        message: "Last name can't exceed 50 characters.",
      }),
    username: z
      .string()
      .min(1, "Username is required.")
      .min(3, "Username must be at least 3 characters long.")
      .max(15, "Username can't exceed 15 characters.")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores."
      ),
    email: z.string().email("Please enter a valid email address."),
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
    passwordConfirmation: z
      .string()
      .min(1, "Password confirmation is required."),
  })
  .superRefine(({ password, passwordConfirmation }, ctx: RefinementCtx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password confirmation must match the password.",
        path: ["passwordConfirmation"],
      });
    }
  });

export type SignupData = z.infer<typeof signupSchema>;

export default signupSchema;
