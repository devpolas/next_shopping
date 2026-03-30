import { Prisma } from "@/lib/generated/prisma/client";

export type Role = "USER" | "MODERATOR" | "ADMIN";

export type UserType = Prisma.UserCreateInput;
