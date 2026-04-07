"use client";
import React, { useEffect, useState } from "react";
import { getCategories } from "@/lib/actions/product.actions";
import { Category } from "@/types/product";
import { useIsMobile } from "@/hooks/use-mobile";
import NavCategory from "./nav-category";
import NavHeader from "./nav-header";

export function Navbar() {
  const [category, setCategory] = useState<Category[] | []>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await getCategories();
        if (response.success && response.categories) {
          setCategory(response.categories);
        }
      } catch (err) {
        console.error("Categories fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const categories = React.useMemo(
    () =>
      category.map((c) => ({
        name: c.name,
        slug: c.slug,
        subcategory:
          c.subCategories?.map((sc) => ({
            name: sc.name,
            slug: sc.slug,
            subcategory:
              sc.subSubCategories?.map((ssc) => ({
                name: ssc.name,
                slug: ssc.slug,
              })) || [],
          })) || [],
      })),
    [category],
  );

  return (
    <nav className='relative w-full'>
      <div className='flex flex-col bg-background px-4 md:px-8'>
        <NavHeader />
        <hr />

        {!isMobile && (
          <NavCategory isLoading={loading} categories={categories} />
        )}
      </div>
    </nav>
  );
}
