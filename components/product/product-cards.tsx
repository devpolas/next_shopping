"use client";
import { Product } from "@/types/product";
import { ProductCard } from "./product-card";
import { useState } from "react";
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

export default function ProductCards({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const totalPages = 10;

  const category = searchParams.get("category");
  const subCategory = searchParams.get("subCategory");
  const subSubCategory = searchParams.get("subSubCategory");
  const currentPage = searchParams.get("subSubCategory");
  const search = searchParams.get("search");

  console.log(category, subCategory, subSubCategory);

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
