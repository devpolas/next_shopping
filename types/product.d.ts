export type Gender = "men" | "women" | "unisex";

export interface Category {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  description: string | null;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  color: string;
  stock: number;
}

import { ProductImage, ProductVariant } from "@prisma/client";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number | null;
  gender: "men" | "women" | "unisex";
  categoryId: string;
  subCategoryId: string;
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
}
