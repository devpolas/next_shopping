import { Prisma } from "@/lib/generated/prisma/client";

export type UserType = Prisma.UserCreateInput;

export type Role = "USER" | "MODERATOR" | "ADMIN";

export type Gender = "MEN" | "WOMEN" | "UNISEX";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod = "COD" | "STRIPE" | "SSL_COMMERZ";

export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface Brand {
  id: string;
  name: string;
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

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;

  totalAmount: number;
  status: OrderStatus;

  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;

  items: OrderItem[];
}

export interface Payment {
  id: string;
  orderId: string;

  method: PaymentMethod;
  status: PaymentStatus;

  transactionId?: string;
}
