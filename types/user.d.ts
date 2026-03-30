import { Cart, Order } from "./order";
import { Review } from "./review";

export type Role = "user" | "moderator" | "admin";

export type UserType = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role?: Role;
  banned?: boolean | null;
  banReason?: string | null;
  banExpires?: Date;
  reviews?: Review[];
  cart?: Cart[];
  orders?: Order[];
};
