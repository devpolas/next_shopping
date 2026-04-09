import AppLayout from "@/components/layouts/app-layout";
import { Heading4 } from "@/components/typography/typography";
import { Badge } from "@/components/ui/badge";
import { getProduct } from "@/lib/actions/product.actions";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";
import ShowProductImage from "@/components/product/show-product-img";
import { Toggle } from "@/components/ui/toggle";
import { Circle, Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react";
import { namePerfect } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsResolvers = await params;
  const id = paramsResolvers.id;

  const productResult = await getProduct(id);

  const product: Product | undefined = productResult.success
    ? productResult.product
    : undefined;

  if (!productResult.success || !productResult.product) {
    return notFound();
  }
  console.log(product);
  return (
    <AppLayout>
      <div className='flex flex-row gap-10 p-6'>
        <div className='flex-2'>
          <div className='w-full h-full'>
            {product?.images && <ShowProductImage img={product?.images} />}
          </div>
        </div>
        <div className='flex-3 space-y-4 p-4 md:border-border border-t-2 md:border-l-2'>
          <div className='space-y-3'>
            <div className='space-y-2'>
              <Heading4 text={product?.name || ""} />
              <Badge variant={"outline"}>
                {product?.brand ? product.brand.name : "unknown"}
              </Badge>
            </div>
            <div className='flex flex-row gap-2'>
              <Badge>{product?.category.name}</Badge>
              <Badge>{product?.subCategory.name}</Badge>
              <Badge>
                {product?.subSubCategory && product.subSubCategory.name}
              </Badge>
            </div>
          </div>

          <div className='bg-input px-4 py-2 rounded-sm w-fit'>
            <p className='flex flex-col gap-1'>
              <span>Spacial Price</span>
              <span>
                <strong>
                  TK {Number(product?.price) - Number(product?.discountPrice)}
                </strong>
              </span>
            </p>
          </div>
          <div>
            <p className='flex flex-col gap-1'>
              <span>Regular Price</span>
              <span>TK {product?.price}</span>
            </p>
          </div>
          <div className='flex flex-row gap-2'>
            {product?.variants.map((variant) => (
              <Toggle
                key={variant.id}
                aria-label='Toggle bookmark'
                size='sm'
                variant={
                  variant.stock === 0 || variant.stock < 1
                    ? "default"
                    : "outline"
                }
                className='hover:cursor-pointer'
                disabled={variant.stock === 0 || variant.stock < 1}
              >
                <Circle className='group-data-[state=on]/toggle:fill-foreground' />
                {variant.size} - {namePerfect(variant.color)}
              </Toggle>
            ))}
          </div>
          <hr />
          <div>
            <h2 className='text-lg'>
              <strong>Description:</strong>
            </h2>
            <p className='text-sm'>{product?.description}</p>
          </div>
        </div>
        <div className='flex-1'>
          <Card className='bg-transparent'>
            <CardHeader>
              <CardTitle>
                <p className='text-sm'>
                  <span className='flex flex-row gap-1.5'>
                    <span>Total</span>
                    <strong>TK</strong>
                    <span>
                      {Number(product?.price) - Number(product?.discountPrice)}
                    </span>
                  </span>
                </p>
              </CardTitle>
              <CardDescription>
                Delivery Charge <strong>TK</strong> 150
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className='flex flex-row justify-center items-center gap-2'>
                <Button size={"icon-sm"}>
                  <Minus />
                </Button>
                <Input defaultValue={1} className='w-20' type='number' />
                <Button size={"icon-sm"}>
                  <Plus />
                </Button>
              </div>
            </CardContent>

            <CardFooter className='flex flex-col gap-2'>
              <Button className='w-full' variant={"outline"}>
                <ShoppingCart />
                Add to Cart
              </Button>
              <Button className='w-full' variant={"secondary"}>
                <ShoppingBag />
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
