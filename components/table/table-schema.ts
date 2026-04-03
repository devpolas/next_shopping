import * as z from "zod";
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  discountPrice: z.number().nullable().optional(),
  gender: z.string(),
  categoryId: z.string(),
  subCategoryId: z.string(),
  brandId: z.string().nullable().optional(),
  images: z.array(z.object({ id: z.string(), url: z.string() })),
  isFeatured: z.boolean(),
  isNew: z.boolean(),
  isActive: z.boolean(),
  variants: z.array(
    z.object({
      size: z.string(),
      color: z.string(),
      stock: z.coerce.number(),
    }),
  ),
  brand: z
    .object({
      id: z.string(),
      name: z.string(),
      isActive: z.boolean(),
    })
    .nullable()
    .optional(),
  category: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable().optional(),
    isActive: z.boolean(),
  }),
  subCategory: z.object({
    id: z.string(),
    name: z.string(),
    categoryId: z.string(),
    isActive: z.boolean(),
  }),
});

export const OrderStatusEnum = z.enum([
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "returned",
  "cancelled",
]);

export const PaymentMethodEnum = z.enum(["cod", "stripe", "ssl_commerz"]);

export const PaymentStatusEnum = z.enum(["pending", "success", "failed"]);

export const OrderItemSchema = z.object({
  id: z.string().optional(),
  orderId: z.string().optional(),
  productId: z.string(),
  variantId: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  product: productSchema,
});

export const PaymentSchema = z.object({
  id: z.string().optional(),
  orderId: z.string(),
  method: PaymentMethodEnum,
  status: PaymentStatusEnum.default("pending"),
  transactionId: z.string(),
  createdAt: z.date().optional(),
});

export const OrderStatusHistorySchema = z.object({
  id: z.string().optional(),
  orderId: z.string(),
  status: OrderStatusEnum,
  createdAt: z.date().optional(),
});

export const orderSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  totalAmount: z.number(),
  status: OrderStatusEnum.default("pending"),
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  phone: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  items: z.array(OrderItemSchema),
  payment: PaymentSchema.optional(),
  user: z.object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string(),
    image: z.string().optional().nullable(),
  }),
  statusHistory: z.array(OrderStatusHistorySchema).optional(),
});
