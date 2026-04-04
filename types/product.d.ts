import { CategoryType } from "@/lib/generated/prisma/enums";

// Gender & CategoryType enums
export type Gender = "men" | "women" | "unisex";

// Category interface
export interface Category {
  id: string;
  name: string;
  slug: string;
  type: CategoryType;
  isActive: boolean;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  subCategories?: SubCategory[];
}

// SubCategory interface
export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  subSubCategories?: SubSubCategory[];
}

// SubSubCategory interface
export interface SubSubCategory {
  id: string;
  name: string;
  slug: string;
  subCategoryId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Brand interface
export interface Brand {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ProductVariant interface
export interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  color: string;
  stock: number;
}

// ProductImage interface
export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number | null;
  gender: Gender;
  categoryId: string;
  subCategoryId: string;
  subSubCategoryId?: string | null;
  brandId: string | null;
  isFeatured: boolean;
  isNew: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: ProductImage[];
  variants: ProductVariant[];
  brand: Brand | null;
  category: Category;
  subCategory: SubCategory;
  subSubCategory?: SubSubCategory | null;
}
