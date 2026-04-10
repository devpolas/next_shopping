"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  const finalPrice = Number(product?.price) - Number(product?.discountPrice);

  return (
    <Card className='mx-auto pt-0 w-full max-w-sm overflow-hidden'>
      {/* Image Container */}
      <div className='relative bg-white w-full h-52 aspect-square'>
        <CldImage
          src={product.images[0].url}
          alt={product.name}
          fill
          preserveTransformations
          className='object-contain'
        />
        {/* Floating Badge Example */}
        {product.brand?.name && (
          <div className='top-3 left-3 z-20 absolute'>
            <Badge variant='secondary' className='opacity-90'>
              {product.brand.name}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className='space-y-4'>
        <CardTitle className='line-clamp-1'>{product.name}</CardTitle>
        <div className='flex flex-row gap-2'>
          <Badge>{product?.category?.name}</Badge>

          <Badge>{product?.subCategory?.name}</Badge>

          <Badge>{product?.subSubCategory?.name}</Badge>
        </div>
        <div className='flex items-baseline gap-3'>
          <span className='font-extrabold text-primary text-xl'>
            TK {finalPrice.toLocaleString()}
          </span>
          {Number(product?.discountPrice) > 0 && (
            <span className='opacity-70 text-muted-foreground text-lg line-through'>
              TK {product?.price}
            </span>
          )}
        </div>
        <CardDescription className='line-clamp-3'>
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className='flex justify-between'>
        <Button>
          <ShoppingCart /> Add to cart
        </Button>
        <Button>
          <Link href={`/product/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
