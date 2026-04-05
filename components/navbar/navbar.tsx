"use client";
import React, { useEffect, useState } from "react";
import NavCategory from "./nav-category";
import NavigationMenu from "./navigation-menu";
import { getCategories } from "@/lib/actions/product.actions";
import { Category } from "@/types/product";

export default function Navbar() {
  const [category, setCategory] = useState<Category[] | []>([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories();
      if (response.success && response.categories) {
        setCategory(response.categories || []);
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
    <nav className='w-full'>
      <div className='flex flex-col bg-background px-4 md:px-8 py-1.5'>
        <NavigationMenu />
        <div className='mx-auto'>
          <NavCategory categories={categories} />
        </div>
      </div>
    </nav>
  );
}
