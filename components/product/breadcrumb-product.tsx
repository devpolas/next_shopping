"use client";

import Link from "next/link";
import { Product } from "@/types/product";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProductBreadcrumb({ product }: { product: Product }) {
  return (
    <Breadcrumb className='mb-6 overflow-x-auto'>
      <BreadcrumbList className='flex-nowrap'>
        {/* HOME - Always Visible */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {/* PRODUCT - Always Visible */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/product'>Product</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* MOBILE ELLIPSIS / DESKTOP FULL CATEGORIES */}
        {/* This section toggles based on screen size */}
        <BreadcrumbItem>
          {/* Mobile: Ellipsis Dropdown */}
          <div className='md:hidden'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size='icon' variant='ghost' className='w-6 h-6'>
                  <BreadcrumbEllipsis />
                  <span className='sr-only'>Toggle categories</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start'>
                <DropdownMenuItem asChild>
                  <Link href={`/product?category=${product.category.name}`}>
                    {product.category.name}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/product?category=${product.category.slug}&subCategory=${product.subCategory.slug}`}
                  >
                    {product.subCategory.name}
                  </Link>
                </DropdownMenuItem>
                {product.subSubCategory && (
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/product?category=${product.category.slug}&subSubCategory=${product.subSubCategory.slug}`}
                    >
                      {product.subSubCategory.name}
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop: Show Category Label */}
          <div className='hidden md:block'>
            <BreadcrumbLink asChild>
              <Link href={`/product?category=${product.category.slug}`}>
                {product.category.name}
              </Link>
            </BreadcrumbLink>
          </div>
        </BreadcrumbItem>

        {/* Desktop Only Separator & SubCategory */}
        <BreadcrumbSeparator className='hidden lg:block' />
        <BreadcrumbItem className='hidden lg:block'>
          <BreadcrumbLink asChild>
            <Link
              href={`/product?category=${product.category.slug}&subCategory=${product.subCategory.slug}`}
            >
              {product.subCategory.name}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* Desktop Only Separator & SubCategory */}
        {product.subSubCategory && (
          <>
            <BreadcrumbSeparator className='hidden xl:block' />
            <BreadcrumbItem className='hidden xl:block'>
              <BreadcrumbLink asChild>
                <Link
                  href={`/product?category=${product.category.slug}&subSubCategory=${product.subSubCategory.slug}`}
                >
                  {product.subSubCategory.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {/* BRAND - Always Visible if exists */}
        {product.brand && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/product?brand=${product.brand.slug}`}>
                  {product.brand.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {/* CURRENT PRODUCT - Always Visible */}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className='max-w-30 sm:max-w-40 lg:max-w-none font-semibold truncate'>
            {product.name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
