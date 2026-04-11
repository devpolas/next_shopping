"use client";

import { Brand, Category, Product } from "@/types/product";
import { ProductCard } from "./product-card";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/lib/actions/product.actions";
import Loading from "@/app/loading";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Heading4 } from "../typography/typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { namePerfect } from "@/utils/utils";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Checkbox } from "../ui/checkbox";

const DEFAULT_PRICE: [number, number] = [0, 10000];
const GENDERS = [
  {
    label: "Men",
    value: "men",
  },
  {
    label: "Women",
    value: "women",
  },
  {
    label: "Unisex",
    value: "unisex",
  },
];

const SORT_OPTIONS = [
  { label: "Latest", value: "createdAt-desc" },
  { label: "Most Reviewed", value: "reviews-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const SIZE = [
  { label: "M", value: "m" },
  { label: "L", value: "l" },
  { label: "XL", value: "xl" },
  { label: "2XL", value: "2xl" },
  { label: "3XL", value: "3xl" },
  { label: "4XL", value: "4xl" },
];

const AVAILABILITY = [
  { label: "New", value: "false" },
  { label: "Featured", value: "false" },
  { label: "Out of Stock", value: "false" },
];

export default function ProductCards({
  brands,
  categories,
}: {
  brands: Brand[];
  categories: Category[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [isError, setIsError] = useState("");
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // filter and sort state
  const [priceRange, setPriceRange] = useState<[number, number]>(DEFAULT_PRICE);
  const [sortBy, setSortBy] = useState("createdAt-desc");

  const PAGE_SIZE = totalPages;

  const category = searchParams.get("category") ?? undefined;
  const subCategory = searchParams.get("subCategory") ?? undefined;
  const subSubCategory = searchParams.get("subSubCategory") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  function getPageNumbers(current: number, total: number, maxVisible = 5) {
    const pages: (number | string)[] = [];

    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);

      const start = Math.max(current - 1, 2);
      const end = Math.min(current + 1, total - 1);

      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < total - 1) pages.push("...");

      pages.push(total);
    }

    return pages;
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      setIsLoading(true);
      setIsError("");

      try {
        const skip = (page - 1) * PAGE_SIZE;

        const response = await getProducts(
          PAGE_SIZE,
          skip,
          search?.toLowerCase(),
          category?.toLowerCase(),
          subCategory?.toLowerCase(),
          subSubCategory?.toLowerCase(),
        );

        if (!isMounted) return;

        if (response.success && response.products) {
          setProducts(response.products);
          setTotalPages(response.totalPage ?? 1);
        } else {
          setProducts([]);
        }
      } catch (error) {
        if (isMounted) {
          setIsError("Something went wrong");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setHasFetched(true);
        }
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [page, search, category, subCategory, subSubCategory]);

  useEffect(() => {
    setPage(1);
  }, [search, category, subCategory, subSubCategory]);

  if (isError) {
    return <div className='text-red-500'>{isError}</div>;
  }

  return (
    <section className='gap-4 grid grid-cols-12'>
      {/* filter box */}
      <div className='space-y-4 col-span-2 bg-background p-4 border border-border'>
        <div className='flex justify-between items-center bg-muted px-2 py-1 rounded'>
          <p className='text-sm'>Filter By</p>
          <Button
            size={"xs"}
            variant={"outline"}
            className='hover:cursor-pointer'
          >
            Reset
          </Button>
        </div>
        <div className='overflow-y-auto'>
          <Collapsible
            open
            className='data-[state=open]:bg-muted p-1 border border-border'
          >
            <CollapsibleTrigger asChild>
              <Button
                variant='ghost'
                className='group w-full hover:cursor-pointer'
              >
                Price Range
                <ChevronDownIcon className='ml-auto group-data-[state=open]:rotate-180' />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className='flex flex-col items-center gap-2 p-2.5 text-sm'>
              <div className='flex flex-row justify-center items-center gap-2'>
                <Input
                  type='number'
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className={cn(
                    "bg-transparent focus-visible:ring-0 h-8 font-bold text-base text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]",
                    "w-18",
                  )}
                />
                <span> - </span>
                <Input
                  type='number'
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className={cn(
                    "bg-transparent focus-visible:ring-0 h-8 font-bold text-base text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]",
                    "w-18",
                  )}
                />
              </div>

              <Slider
                value={priceRange}
                onValueChange={(val) => setPriceRange(val as [number, number])}
                max={10000}
                min={0}
                step={10}
                className='mt-2 w-full'
                aria-label='Price Range'
              />
            </CollapsibleContent>
          </Collapsible>
          <Collapsible
            open
            className='data-[state=open]:bg-muted p-1 border border-border'
          >
            <CollapsibleTrigger asChild>
              <Button
                variant='ghost'
                className='group w-full hover:cursor-pointer'
              >
                Gender
                <ChevronDownIcon className='ml-auto group-data-[state=open]:rotate-180' />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className='p-2.5 text-sm'>
              <FieldSet>
                <FieldGroup className='gap-2'>
                  {GENDERS.map((gender) => (
                    <Field orientation='horizontal' key={gender.value}>
                      <Checkbox id={gender.value} name={gender.label} />
                      <FieldLabel
                        htmlFor={gender.value}
                        className='font-normal'
                      >
                        {gender.label}
                      </FieldLabel>
                    </Field>
                  ))}
                </FieldGroup>
              </FieldSet>
            </CollapsibleContent>
          </Collapsible>
          {brands && (
            <Collapsible className='data-[state=open]:bg-muted p-1 border border-border'>
              <CollapsibleTrigger asChild>
                <Button
                  variant='ghost'
                  className='group w-full hover:cursor-pointer'
                >
                  Brands
                  <ChevronDownIcon className='ml-auto group-data-[state=open]:rotate-180' />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className='p-2.5 text-sm'>
                <FieldSet>
                  <FieldGroup className='gap-2'>
                    {brands &&
                      brands.map((brand) => (
                        <Field orientation='horizontal' key={brand.slug}>
                          <Checkbox id={brand.slug} name={brand.name} />
                          <FieldLabel
                            htmlFor={brand.slug}
                            className='font-normal'
                          >
                            {namePerfect(brand.name)}
                          </FieldLabel>
                        </Field>
                      ))}
                  </FieldGroup>
                </FieldSet>
              </CollapsibleContent>
            </Collapsible>
          )}
          {categories && (
            <Collapsible className='data-[state=open]:bg-muted p-1 border border-border'>
              <CollapsibleTrigger asChild>
                <Button
                  variant='ghost'
                  className='group w-full hover:cursor-pointer'
                >
                  Categories
                  <ChevronDownIcon className='ml-auto group-data-[state=open]:rotate-180' />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className='p-2.5 text-sm'>
                <FieldSet>
                  <FieldGroup className='gap-2'>
                    {categories &&
                      categories.map((category) => (
                        <Field orientation='horizontal' key={category.slug}>
                          <Checkbox id={category.slug} name={category.name} />
                          <FieldLabel
                            htmlFor={category.slug}
                            className='font-normal'
                          >
                            {namePerfect(category.name)}
                          </FieldLabel>
                        </Field>
                      ))}
                  </FieldGroup>
                </FieldSet>
              </CollapsibleContent>
            </Collapsible>
          )}
          <Collapsible
            open
            className='data-[state=open]:bg-muted p-1 border border-border'
          >
            <CollapsibleTrigger asChild>
              <Button
                variant='ghost'
                className='group w-full hover:cursor-pointer'
              >
                Sizes
                <ChevronDownIcon className='ml-auto group-data-[state=open]:rotate-180' />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className='p-2.5 text-sm'>
              <FieldSet>
                <FieldGroup className='gap-2'>
                  {SIZE.map((size) => (
                    <Field orientation='horizontal' key={size.value}>
                      <Checkbox id={size.value} name={size.label} />
                      <FieldLabel htmlFor={size.value} className='font-normal'>
                        {size.label}
                      </FieldLabel>
                    </Field>
                  ))}
                </FieldGroup>
              </FieldSet>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible className='data-[state=open]:bg-muted p-1 border border-border'>
            <CollapsibleTrigger asChild>
              <Button
                variant='ghost'
                className='group w-full hover:cursor-pointer'
              >
                Availability
                <ChevronDownIcon className='ml-auto group-data-[state=open]:rotate-180' />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className='p-2.5 text-sm'>
              <FieldSet>
                <FieldGroup className='gap-2'>
                  {AVAILABILITY.map((item, key) => (
                    <Field orientation='horizontal' key={key}>
                      <Checkbox id={item.value} name={item.label} />
                      <FieldLabel htmlFor={item.value} className='font-normal'>
                        {item.label}
                      </FieldLabel>
                    </Field>
                  ))}
                </FieldGroup>
              </FieldSet>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      {/* main content  */}
      <div className='flex flex-col col-span-10'>
        <div className='space-y-4'>
          <div className='flex flex-row justify-between items-center bg-background px-8 py-2'>
            <Heading4
              text={
                category ? `${namePerfect(category)} Products` : "All Products"
              }
            />
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='group w-40'>
                    Sort By
                    <ChevronDownIcon className='ml-auto group-data-[state=open]:rotate-180' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='space-y-2 p-2'>
                  {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      className={cn(
                        "text-xs hover:cursor-pointer",
                        sortBy === option.value && "bg-accent font-medium",
                      )}
                      onClick={() => setSortBy(option.value)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : !hasFetched ? null : products.length === 0 ? (
            <p className='py-10 text-muted-foreground text-sm md:text-lg xl:text-xl text-center'>
              No products found for your filters
            </p>
          ) : (
            <div className='gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* pagination  */}
        {products.length > 0 && totalPages > 1 && (
          <div className='py-16'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className='cursor-pointer'
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  />
                </PaginationItem>

                {getPageNumbers(page, totalPages).map((p, idx) => (
                  <PaginationItem key={idx}>
                    {typeof p === "number" ? (
                      <PaginationLink
                        className='cursor-pointer'
                        isActive={p === page}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </PaginationLink>
                    ) : (
                      <PaginationEllipsis />
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    className='cursor-pointer'
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
}
