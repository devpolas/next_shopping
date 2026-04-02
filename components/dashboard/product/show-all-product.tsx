"use client";
import { Product } from "@/types/product";

const product = [
  {
    id: "5700fc04-bba4-4ee1-89ad-fac11c768edb",
    name: "Unisex High quality 180 gsm Cotton solid Black",
    slug: "Unisex-High-quality-180-gsm-Cotton-solid-Black",
    description:
      "Premium Quality t-shirt offers a smoother, silky feel and a more structured, mid-weight fit than regular t-shirts. The t-shirts are made with the finest quality Combed Compact Cotton, featuring an astonishing ~180 GSM on just 26's cotton, which provides a smooth and compact construction.\n\nThe compact finish guarantees that the t-shirt's length and width will not change over washes or months of usage.",
    price: 299,
    discountPrice: 49,
    gender: "unisex",
    categoryId: "cde8d56e-dc36-4769-899f-0175ea4d9ec5",
    subCategoryId: "ff30bc92-5676-46e8-8dcf-c47f8cc3b382",
    brandId: "2f0658c3-d9f7-484f-897a-cf6446092a49",
    isFeatured: false,
    isNew: true,
    isActive: true,
    createdAt: "2026-04-02T08:28:25.548Z",
    updatedAt: "2026-04-02T08:28:25.548Z",
    images: [
      {
        id: "587ba41b-0e3c-4705-b5a4-b4caf6de77fa",
        url: "https://res.cloudinary.com/db7ar6ox9/image/upload/v1775118500/bmgqdm7fbouzoxqwkgbm.jpg",
        productId: "5700fc04-bba4-4ee1-89ad-fac11c768edb",
        createdAt: "2026-04-02T08:28:25.548Z",
      },
      {
        id: "2be0bed3-7a16-4174-9c70-fdd6d9b101ab",
        url: "https://res.cloudinary.com/db7ar6ox9/image/upload/v1775118503/hzdim2n17i8yfz2undkc.jpg",
        productId: "5700fc04-bba4-4ee1-89ad-fac11c768edb",
        createdAt: "2026-04-02T08:28:25.548Z",
      },
      {
        id: "7728df2d-f728-46f5-bdd1-9625be8d29d0",
        url: "https://res.cloudinary.com/db7ar6ox9/image/upload/v1775118504/ga5tgf691yi0npmvgr9s.webp",
        productId: "5700fc04-bba4-4ee1-89ad-fac11c768edb",
        createdAt: "2026-04-02T08:28:25.548Z",
      },
    ],
    variants: [
      {
        id: "e4e7a116-4191-4a38-a333-a0e1d2896eff",
        productId: "5700fc04-bba4-4ee1-89ad-fac11c768edb",
        size: "m",
        color: "black",
        stock: 100,
      },
      {
        id: "dbf3ff44-1ee7-4b27-9b20-ae1df9aacfff",
        productId: "5700fc04-bba4-4ee1-89ad-fac11c768edb",
        size: "l",
        color: "black",
        stock: 100,
      },
      {
        id: "3ed165e5-07a9-4949-9c7a-bfaea09dab9d",
        productId: "5700fc04-bba4-4ee1-89ad-fac11c768edb",
        size: "xl",
        color: "black",
        stock: 100,
      },
      {
        id: "16258af2-7db0-4ea0-98b1-8f63c44c8b8e",
        productId: "5700fc04-bba4-4ee1-89ad-fac11c768edb",
        size: "2xl",
        color: "black",
        stock: 100,
      },
    ],
  },
];

const tableTitles = ["Name", ""];

export default function ShowAllProducts({ products }: { products: Product[] }) {
  console.log(products);
  return <div>{}</div>;
}
