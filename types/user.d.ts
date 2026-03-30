import { Cart, Order } from "./order";
import { Review } from "./review";

export type Role = "USER" | "MODERATOR" | "ADMIN";

export type UserType = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  banned?: boolean | null;
  banReason?: string | null;
  banExpires?: Date;
  reviews?: Review[];
  cart?: Cart[];
  orders?: Order[];
};
