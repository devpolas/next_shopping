"use client";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeSwitcher } from "../theme/theme-switcher";
import { Menu } from "lucide-react";
import MobileLogo from "../logo/logo-mobile";
import React, { useEffect, useState } from "react";
import { getCategories } from "@/lib/actions/product.actions";
import { Category } from "@/types/product";

export default function MobileNav() {
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
    <Sheet>
      <SheetTrigger asChild>
        <Menu className='font-bold' size={18} />
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <div className='flex flex-row items-center gap-4'>
            <MobileLogo />
            <ThemeSwitcher />
          </div>
        </SheetHeader>
        <hr />

        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
