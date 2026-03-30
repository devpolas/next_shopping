export type PaymentMethod = "COD" | "STRIPE" | "SSL_COMMERZ";

export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

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
