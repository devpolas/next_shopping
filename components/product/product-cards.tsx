"use client";
import { Product } from "@/types/product";
import { ProductCard } from "./product-card";
import { startTransition, useEffect, useState } from "react";
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

export default function ProductCards() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[] | []>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 10;

  // Extract params for the dependency array
  const category = searchParams.get("category") ?? undefined;
  const subCategory = searchParams.get("subCategory") ?? undefined;
  const subSubCategory = searchParams.get("subSubCategory") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  // pagination logic
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
    async function fetchProducts() {
      // Calculate skip for Prisma
      const skip = (page - 1) * PAGE_SIZE;

      startTransition(async () => {
        const response = await getProducts(
          PAGE_SIZE,
          skip,
          search,
          category,
          subCategory,
          subSubCategory,
        );

        if (response.success && response.products) {
          setProducts(response.products as Product[]);
          setTotalPages(response.totalPage ?? 1);
        }
      });
    }

    fetchProducts();
    // Re-fetch when page or filters change
  }, [page, search, category, subCategory, subSubCategory]);

  // Reset to page 1 if filters change
  useEffect(() => {
    //eslint-disable-next-line
    setPage(1);
  }, [search, category, subCategory, subSubCategory]);

  return (
    <div className='flex flex-col'>
      <div className='gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className='py-16'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className='hover:cursor-pointer'
                onClick={() => setPage(page > 1 ? page - 1 : 1)}
              />
            </PaginationItem>

            {getPageNumbers(page, Number(totalPages)).map((p, idx) => (
              <PaginationItem key={idx}>
                {typeof p === "number" ? (
                  <PaginationLink
                    className='hover:cursor-pointer'
                    isActive={p === page}
                    onClick={() => setPage(p)}
                  >
                    {p ? p : "..."}
                  </PaginationLink>
                ) : (
                  <PaginationEllipsis />
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                className='hover:cursor-pointer'
                onClick={() =>
                  setPage(
                    page < Number(totalPages) ? page + 1 : Number(totalPages),
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
