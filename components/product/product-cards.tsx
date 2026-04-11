"use client";

import { Product } from "@/types/product";
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

export default function ProductCards() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PAGE_SIZE = 10;

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
    let isMounted = true; // prevent race condition

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

  if (isLoading) return <Loading />;

  if (isError) {
    return <div className='text-red-500'>{isError}</div>;
  }

  return (
    <div className='flex flex-col'>
      {products.length === 0 ? (
        <p className='py-10 text-muted-foreground text-sm md:text-lg xl:text-xl text-center'>
          No products found for your filters
        </p>
      ) : (
        <div className='gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

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
  );
}
