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

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;

  price: number;
  discountPrice?: number;

  gender: Gender;

  categoryId: string;
  subCategoryId: string;
  brandId?: string;

  images: string[];

  isFeatured: boolean;
  isNew: boolean;
  isActive: boolean;

  createdAt: Date;

  variants: ProductVariant[];
}
