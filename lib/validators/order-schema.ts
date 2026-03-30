import * as z from "zod";

//////////////////////
// ENUMS
//////////////////////
export const paymentMethodSchema = z.enum(["COD", "STRIPE", "SSL_COMMERZ"]);

export const paymentStatusSchema = z.enum(["PENDING", "SUCCESS", "FAILED"]);

export const orderStatusSchema = z.enum([
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
]);

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;
export type OrderStatus = z.infer<typeof orderStatusSchema>;

//////////////////////
// CART ITEM
//////////////////////
export const cartItemSchema = z.object({
  productId: z.string({ error: "Product is required" }),
  variantId: z.string().optional(),
  quantity: z
    .number({ error: "Quantity must be a number" })
    .int({ error: "Quantity must be an integer" })
    .positive({ error: "Quantity must be at least 1" }),
});

export type CartItem = z.infer<typeof cartItemSchema>;

//////////////////////
// CART
//////////////////////
export const cartSchema = z.object({
  userId: z.string({ error: "User is required" }),
  items: z
    .array(cartItemSchema)
    .min(1, { error: "Cart must have at least 1 item" }),
});

export type Cart = z.infer<typeof cartSchema>;

//////////////////////
// ORDER ITEM
//////////////////////
export const orderItemSchema = z.object({
  productId: z.string({ error: "Product is required" }),
  variantId: z.string().optional(),
  quantity: z
    .number({ error: "Quantity must be a number" })
    .int({ error: "Quantity must be an integer" })
    .positive({ error: "Quantity must be at least 1" }),
  price: z
    .number({ error: "Price must be a number" })
    .positive({ error: "Price must be positive" }),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

//////////////////////
// ORDER
//////////////////////
export const orderSchema = z
  .object({
    userId: z.string({ error: "User is required" }),
    totalAmount: z
      .number({ error: "Total amount must be a number" })
      .positive({ error: "Total amount must be positive" }),
    status: orderStatusSchema,
    address: z
      .string()
      .min(5, { error: "Address must be at least 5 characters" }),
    city: z.string().min(2, { error: "City must be at least 2 characters" }),
    postalCode: z.string().min(3, { error: "Postal code is required" }),
    country: z.string().min(2, { error: "Country is required" }),
    phone: z
      .string()
      .min(6, { message: "Phone number is too short" })
      .max(20, { message: "Phone number is too long" }),
    items: z
      .array(orderItemSchema)
      .min(1, { message: "Order must have at least 1 item" }),
  })
  // Ensure totalAmount matches sum of items
  .refine(
    (data) => {
      const sum = data.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      return sum === data.totalAmount;
    },
    {
      message: "Total amount must equal sum of item prices",
      path: ["totalAmount"],
    },
  );

export type Order = z.infer<typeof orderSchema>;

//////////////////////
// PAYMENT
//////////////////////
export const paymentSchema = z.object({
  orderId: z.string({ error: "Order is required" }),
  method: paymentMethodSchema,
  status: paymentStatusSchema,
  transactionId: z.string().optional(),
});

export type Payment = z.infer<typeof paymentSchema>;
