import * as z from "zod";

//////////////////////
// CATEGORY
//////////////////////
export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Category name must be at least 3 characters" })
    .max(50, { message: "Category name cannot exceed 50 characters" }),
  type: z.enum(["men", "women", "kids", "unisex", "beauty", "sports"]),
  isActive: z.boolean().default(true),
  description: z
    .string()
    .trim()
    .max(200, { message: "Description cannot exceed 200 characters" })
    .optional(),
});

export type CategoryInput = z.input<typeof categorySchema>;

//////////////////////
// SUBCATEGORY
//////////////////////
export const subCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Subcategory name must be at least 3 characters" })
    .max(50, { message: "Subcategory name cannot exceed 50 characters" }),
  categoryId: z.string({ error: "Category is required" }),
  isActive: z.boolean().default(true),
});

export type SubCategoryInput = z.input<typeof subCategorySchema>;

//////////////////////
// SUBSUBCATEGORY
//////////////////////
export const subSubCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Sub-subcategory name must be at least 3 characters" })
    .max(50, { message: "Sub-subcategory name cannot exceed 50 characters" }),
  subCategoryId: z.string({ error: "Subcategory is required" }),
  isActive: z.boolean().default(true),
});

export type SubSubCategoryInput = z.input<typeof subSubCategorySchema>;

//////////////////////
// BRAND
//////////////////////
export const brandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Brand name must be at least 2 characters" })
    .max(50, { message: "Brand name cannot exceed 50 characters" }),
  isActive: z.boolean().default(true),
});

export type BrandInput = z.input<typeof brandSchema>;

//////////////////////
// PRODUCT VARIANT
//////////////////////
export const productVariantSchema = z.object({
  id: z.string().optional(),
  size: z
    .string()
    .trim()
    .min(1, { message: "Size is required" })
    .max(20, { message: "Size cannot exceed 20 characters" }),
  color: z
    .string()
    .trim()
    .min(3, { message: "Color must be at least 3 characters" })
    .max(30, { message: "Color cannot exceed 30 characters" }),
  stock: z
    .number({ error: "Stock must be a number" })
    .int({ message: "Stock must be an integer" })
    .nonnegative({ message: "Stock cannot be negative" }),
});

export type ProductVariantInput = z.input<typeof productVariantSchema>;

//////////////////////
// PRODUCT
//////////////////////
export const productSchema = z
  .object({
    name: z.string().min(3).max(200),
    description: z.string().min(10).max(2000),
    price: z
      .number({ error: "Price must be a number" })
      .positive({ message: "Price must be positive" }),
    discountPrice: z
      .number({ error: "Discount must be a number" })
      .positive({ message: "Discount must be positive" })
      .optional(),
    gender: z.enum(["men", "women", "unisex"]),
    categoryId: z.string({ error: "Category is required" }),
    subCategoryId: z.string({ error: "Subcategory is required" }),
    subSubCategoryId: z.string().optional(),
    brandId: z.string().optional(),
    coverImage: z.string().min(1),
    images: z
      .array(
        z.object({
          id: z.string().optional(),
          url: z.string({ error: "Image URL is required" }).trim(),
        }),
      )
      .min(1, { message: "At least one image is required" }),
    isFeatured: z.boolean().default(false),
    isNew: z.boolean().default(true),
    isActive: z.boolean().default(true),
    variants: z
      .array(productVariantSchema)
      .min(1)
      .max(100)
      .refine(
        (variants) =>
          new Set(
            variants.map(
              (v) =>
                `${v.size.trim().toLowerCase()}-${v.color.trim().toLowerCase()}`,
            ),
          ).size === variants.length,
        {
          message: "Duplicate size/color variants are not allowed",
          path: ["variants"],
        },
      ),
  })
  .refine(
    (data) => data.discountPrice == null || data.discountPrice < data.price,
    {
      message: "Discount price must be less than original price",
      path: ["discountPrice"],
    },
  );

export type ProductInput = z.input<typeof productSchema>;
