"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type SubSubCategory = {
  name: string;
  slug: string;
};

type SubCategory = {
  name: string;
  slug: string;
  subcategory: SubSubCategory[];
};

type Category = {
  name: string;
  slug: string;
  subcategory: SubCategory[];
};

function CategoryMenu({ cat }: { cat: Category }) {
  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => {
    if (cat.subcategory.length > 0 && active === "") {
      setActive(cat.subcategory[0].slug);
    }
  }, [cat.subcategory]);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className='font-semibold text-[16px]'>
        {cat.name}
      </NavigationMenuTrigger>

      <NavigationMenuContent className='p-0'>
        <div className='flex w-[500px]'>
          {/* LEFT */}
          <div className='bg-muted w-1/3'>
            {cat.subcategory.map((sc) => (
              <div
                key={sc.slug}
                onMouseEnter={() => setActive(sc.slug)}
                className={`px-4 py-2 cursor-pointer transition ${
                  active === sc.slug ? "bg-background font-semibold" : ""
                }`}
              >
                {sc.name}
              </div>
            ))}
          </div>

          {/* RIGHT */}
          {cat.subcategory.length > 0 && (
            <div className='p-4 w-2/3'>
              {cat.subcategory.length > 0 &&
                cat.subcategory
                  .filter((sc) => sc.slug === active)
                  .map((sc) => (
                    <ul key={sc.slug} className='space-y-1'>
                      {sc.subcategory.map((ssc) => (
                        <li key={ssc.slug}>
                          <Link
                            href={`/product?category=${encodeURIComponent(
                              cat.slug,
                            )}&subCategory=${encodeURIComponent(
                              sc.name,
                            )}&subSubCategory=${encodeURIComponent(ssc.name)}`}
                            prefetch={false}
                            className='block hover:bg-muted px-2 py-1 rounded hover:underline transition'
                          >
                            {ssc.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
            </div>
          )}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export default function NavCategory({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className='flex gap-4'>
      {categories.map((cat) => (
        <NavigationMenu key={cat.slug}>
          <NavigationMenuList>
            <CategoryMenu key={cat.slug} cat={cat} />
          </NavigationMenuList>
        </NavigationMenu>
      ))}
    </div>
  );
}
