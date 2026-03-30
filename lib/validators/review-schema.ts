import { z } from "zod";

//////////////////////
// REVIEW SCHEMA
//////////////////////
export const reviewSchema = z.object({
  userId: z.string({ error: "User ID is required" }),
  productId: z.string({ error: "Product ID is required" }),
  rating: z
    .number({ error: "Rating must be a number" })
    .int({ error: "Rating must be an integer" })
    .min(1, { error: "Rating must be at least 1" })
    .max(5, { error: "Rating cannot exceed 5" }),
  comment: z
    .string()
    .max(500, { message: "Comment cannot exceed 500 characters" })
    .optional(),
});

export type Review = z.infer<typeof reviewSchema>;
