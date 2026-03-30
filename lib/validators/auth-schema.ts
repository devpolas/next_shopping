import * as z from "zod";

export const userSignupSchema = z
  .object({
    name: z
      .string("fullname is required")
      .min(3, "fullname minimum 3 characters")
      .max(20, "fullname maximum 20 characters or less"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be 30 characters or less"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const userSigninSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
