import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(3).max(200),
  description: z.string().min(10).max(2000),
  price: z.number().min(1),
  discountPrice: z.number().optional(),
  gender: z.enum(["men", "women", "unisex"]),
  categoryId: z.string().min(1),
  subCategoryId: z.string().min(1),
  subSubCategoryId: z.string().optional(),
  brandId: z.string().optional(),
  coverImage: z.instanceof(File).optional(),
  images: z
    .array(
      z.object({
        file: z.instanceof(File),
        url: z.string(),
      }),
    )
    .min(1, "At least one image required"),
  isFeatured: z.enum(["true", "false"]),
  isNew: z.enum(["true", "false"]),
  isActive: z.enum(["true", "false"]),
  variants: z
    .array(
      z.object({
        size: z.string().min(1, "Size is required"),
        color: z.string().min(1, "Color is required"),
        stock: z.number().min(1),
      }),
    )
    .min(1, "At least one variant is required"),
});

export type ProductInput = z.infer<typeof productSchema>;

export const productDefaultValues: ProductInput = {
  name: "",
  description: "",
  price: 1,
  coverImage: undefined,
  discountPrice: undefined,
  gender: "men",
  categoryId: "",
  subCategoryId: "",
  subSubCategoryId: "",
  brandId: "",
  isFeatured: "false",
  isNew: "false",
  isActive: "true",
  images: [],
  variants: [{ size: "", color: "", stock: 1 }],
};
