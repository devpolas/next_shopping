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
  const [active, setActive] = React.useState(cat.subcategory[0].slug);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className='font-semibold text-[16px]'>
        {cat.name}
      </NavigationMenuTrigger>

      <NavigationMenuContent className='p-0'>
        <div className='flex w-[500px]'>
          {/* LEFT */}
          <div className='bg-muted w-1/3'>
            {cat.subcategory.map((group) => (
              <div
                key={group.slug}
                onMouseEnter={() => setActive(group.slug)}
                className={`px-4 py-2 cursor-pointer transition ${
                  active === group.slug ? "bg-background font-semibold" : ""
                }`}
              >
                {group.name}
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className='p-4 w-2/3'>
            {cat.subcategory
              .filter((group) => group.slug === active)
              .map((group) => (
                <ul key={group.slug} className='space-y-1'>
                  {group.subcategory.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/${cat.slug}/${group.slug}/${item.slug}`}
                        className='block hover:bg-muted px-2 py-1 rounded hover:underline transition'
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
          </div>
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
    <NavigationMenu>
      <NavigationMenuList>
        {categories.map((cat) => (
          <CategoryMenu key={cat.slug} cat={cat} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
