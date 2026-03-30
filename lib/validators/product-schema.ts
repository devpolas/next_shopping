import * as z from "zod";

//////////////////////
// CATEGORY
//////////////////////
export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { error: "Category name must be at least 3 characters" })
    .max(50, { error: "Category name cannot exceed 50 characters" }),
  description: z
    .string()
    .trim()
    .max(200, { error: "Description cannot exceed 200 characters" })
    .optional(),
  isActive: z.boolean().default(true),
});

export type CategoryInput = z.input<typeof categorySchema>;

//////////////////////
// SUBCATEGORY
//////////////////////
export const subCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { error: "Subcategory name must be at least 3 characters" })
    .max(50, { error: "Subcategory name cannot exceed 50 characters" }),
  categoryId: z.string({ error: "Category is required" }),
  isActive: z.boolean().default(true),
});

export type SubCategoryInput = z.input<typeof subCategorySchema>;

//////////////////////
// BRAND
//////////////////////
export const brandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Brand name must be at least 2 characters" })
    .max(50, { error: "Brand name cannot exceed 50 characters" }),
  isActive: z.boolean().default(true),
});

export type BrandInput = z.input<typeof brandSchema>;

//////////////////////
// PRODUCT VARIANT
//////////////////////
export const productVariantSchema = z.object({
  productId: z.string({ error: "Product is required" }),
  size: z
    .string()
    .trim()
    .min(1, { error: "Size is required" })
    .max(20, { error: "Size cannot exceed 20 characters" }),
  color: z
    .string()
    .trim()
    .min(3, { error: "Color must be at least 3 characters" })
    .max(30, { error: "Color cannot exceed 30 characters" }),
  stock: z
    .number({ error: "Stock must be a number" })
    .int({ error: "Stock must be an integer" })
    .nonnegative({ error: "Stock cannot be negative" }),
});

export type ProductVariantInput = z.input<typeof productVariantSchema>;

//////////////////////
// PRODUCT
//////////////////////
export const productSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { error: "Product name must be at least 3 characters" })
      .max(100, { error: "Product name cannot exceed 100 characters" }),
    description: z
      .string()
      .trim()
      .min(10, { error: "Description must be at least 10 characters" })
      .max(1000, { error: "Description cannot exceed 1000 characters" }),
    price: z
      .number({ error: "Price must be a number" })
      .positive({ error: "Price must be positive" }),
    discountPrice: z
      .number({ error: "Discount must be a number" })
      .positive({ error: "Discount must be positive" })
      .optional(),
    gender: z.enum(["MEN", "WOMEN", "UNISEX"], { error: "Invalid gender" }),
    categoryId: z.string({ error: "Category is required" }),
    subCategoryId: z.string({ error: "Subcategory is required" }),
    brandId: z.string().optional(),
    images: z
      .array(z.string({ error: "Invalid image URL" }))
      .min(1, { error: "At least one image is required" }),
    isFeatured: z.boolean().default(false),
    isNew: z.boolean().default(true),
    isActive: z.boolean().default(true),
    variants: z
      .array(productVariantSchema)
      .min(1, { error: "At least one variant is required" }),
  })
  // Ensure discountPrice < price
  .refine((data) => !data.discountPrice || data.discountPrice < data.price, {
    message: "Discount price must be less than original price",
    path: ["discountPrice"],
  })
  // Ensure no duplicate size-color combinations
  .refine(
    (data) => {
      const combinations = data.variants.map((v) => `${v.size}-${v.color}`);
      return new Set(combinations).size === combinations.length;
    },
    {
      message: "Duplicate size/color variants are not allowed",
      path: ["variants"],
    },
  );

export type ProductInput = z.input<typeof productSchema>;
