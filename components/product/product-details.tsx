"use client";
import { Product } from "@/types/product";
import ShowProductImage from "./show-product-img";
import { Heading4 } from "../typography/typography";
import { Badge } from "../ui/badge";
import { ShoppingBag, ShoppingCart, CheckCircle2 } from "lucide-react";
import { namePerfect } from "@/utils/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import CartInput from "./product-cart-quantity";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import ProductBreadcrumb from "./breadcrumb-product";

export default function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [maxStock, setMaxStock] = useState<number>(0);

  const finalPrice = Number(product?.price) - Number(product?.discountPrice);
  const total = finalPrice * quantity;
  const delivery = 150;
  const grandTotal = total + delivery;

  useEffect(() => {
    if (!selectedVariant) {
      return;
    }
    const maxStock =
      product?.variants.find((v) => v.id === selectedVariant)?.stock ?? 0;
    // eslint-disable-next-line
    setMaxStock(maxStock);
  }, [selectedVariant]);

  function handleCart() {
    console.log(product.id, grandTotal, quantity);
  }
  function handleOrder() {
    console.log(product.id, grandTotal, quantity);
  }

  return (
    <section className='space-y-6 mx-auto px-4 py-4 md:py-10'>
      <ProductBreadcrumb product={product} />
      <div>
        {/* Main Grid: Stacked on mobile, 12-cols on Desktop */}
        <div className='gap-4 xl:gap-8 grid grid-cols-1 xl:grid-cols-12'>
          {/* LEFT: IMAGE SECTION (Col: 5) */}
          <div className='xl:col-span-4'>
            <div className='lg:top-28 lg:sticky'>
              <ShowProductImage img={product?.images} />
            </div>
          </div>

          {/* RIGHT: INFO & CHECKOUT (Col: 7) */}
          <div className='flex flex-col gap-6 xl:col-span-8'>
            <div className='gap-4 grid grid-cols-1 md:grid-cols-12'>
              {/* PRODUCT INFO */}
              <div className='space-y-6 md:col-span-8'>
                <div className='space-y-4'>
                  <Badge
                    variant='secondary'
                    className='px-3 py-1 rounded-full font-semibold text-xs'
                  >
                    {product?.brand?.name || "Premium Selection"}
                  </Badge>

                  <Heading4
                    className='font-bold text-2xl md:text-3xl tracking-tight'
                    text={product?.name || ""}
                  />

                  <div className='flex flex-row gap-2'>
                    <Badge>{product?.category?.name}</Badge>

                    <Badge>{product?.subCategory?.name}</Badge>

                    <Badge>{product?.subSubCategory?.name}</Badge>
                  </div>

                  <div className='flex items-baseline gap-3'>
                    <span className='font-extrabold text-primary text-3xl'>
                      TK {finalPrice.toLocaleString()}
                    </span>
                    {Number(product?.discountPrice) > 0 && (
                      <span className='opacity-70 text-muted-foreground text-lg line-through'>
                        TK {product?.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* VARIANTS - Improved touch targets */}
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <Label className='font-bold text-base'>
                      Select Variation
                    </Label>
                    {selectedVariant && (
                      <div>
                        <span className='slide-in-from-right-2 flex items-center gap-1 text-green-600 text-xs animate-in fade-in'>
                          <CheckCircle2 className='w-3 h-3' /> Selected
                        </span>
                        <p className='text-muted-foreground text-xs animate-in fade-in'>
                          {maxStock > 0
                            ? `Stock available: ${maxStock}`
                            : "Out of stock"}
                        </p>
                      </div>
                    )}
                  </div>

                  <RadioGroup
                    onValueChange={(value) => setSelectedVariant(value)}
                    className='gap-3 grid grid-cols-2 lg:grid-cols-4'
                  >
                    {product?.variants.map((variant) => (
                      <div key={variant.id} className='relative'>
                        <RadioGroupItem
                          value={variant.id}
                          id={variant.id}
                          className='sr-only peer'
                          disabled={variant.stock < 1}
                        />
                        <Label
                          htmlFor={variant.id}
                          className={cn(
                            "flex flex-col justify-center items-center hover:bg-accent p-3 border-2 rounded-xl transition-all cursor-pointer",
                            "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary",
                            variant.stock < 1 &&
                              "opacity-50 cursor-not-allowed grayscale",
                          )}
                        >
                          <span className='font-bold text-sm uppercase'>
                            {variant.size}
                          </span>
                          <span className='text-[10px] text-muted-foreground'>
                            {namePerfect(variant.color)}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* DESCRIPTION */}
                <div className='space-y-3 pt-6 border-t'>
                  <h3 className='font-bold text-lg'>Product Details</h3>
                  <p className='text-muted-foreground/90 text-sm leading-relaxed whitespace-pre-line'>
                    {product?.description}
                  </p>
                </div>
              </div>

              {/* CHECKOUT CARD - Sticky on larger screens within this column */}
              <div className='lg:top-28 lg:sticky md:col-span-4 h-fit'>
                <Card className='shadow-xl border-2 ring-1 ring-black/5 overflow-hidden'>
                  <CardHeader className='bg-muted/30 pb-4'>
                    <CardTitle className='text-lg'>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-5 pt-6'>
                    <div className='space-y-3 text-sm'>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>
                          Subtotal ({quantity} items)
                        </span>
                        <span className='font-medium'>
                          TK {total.toLocaleString()}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>
                          Estimated Delivery
                        </span>
                        <span className='font-medium'>TK {delivery}</span>
                      </div>
                      <div className='flex justify-between items-center pt-3 border-t'>
                        <span className='font-bold text-base'>Grand Total</span>
                        <span className='font-black text-primary text-xl'>
                          TK {grandTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className='space-y-3'>
                      <Label className='font-bold text-muted-foreground text-xs uppercase tracking-wider'>
                        Adjust Quantity
                      </Label>
                      <CartInput
                        quantity={quantity}
                        setQuantity={setQuantity}
                        maxStock={maxStock}
                      />
                    </div>
                  </CardContent>

                  <CardFooter className='flex flex-col gap-3 pb-6'>
                    <Button
                      disabled={!selectedVariant}
                      variant='outline'
                      className='group w-full h-12 font-semibold text-base'
                      onClick={handleCart}
                    >
                      <ShoppingCart className='mr-2 w-5 h-5 transition-transform group-hover:-translate-y-1' />
                      Add to Cart
                    </Button>

                    <Button
                      disabled={!selectedVariant}
                      className={cn(
                        "shadow-lg shadow-primary/20 w-full h-12 font-bold text-base",
                        selectedVariant && "animate-pulse-subtle",
                      )}
                      onClick={handleOrder}
                    >
                      <ShoppingBag className='mr-2 w-5 h-5' />
                      Buy Now
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
