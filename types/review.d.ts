export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  createdAt: Date;
}
