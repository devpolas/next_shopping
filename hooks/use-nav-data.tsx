"use client";
import { getCategories } from "@/lib/actions/product.actions";
import { Category } from "@/types/product";
import { useEffect, useMemo, useState } from "react";

export default function useNavData() {
  const [category, setCategory] = useState<Category[] | []>([]);
  const [loading, setLoading] = useState(true);

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

  const categories = useMemo(
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

  return { loading, categories };
}
