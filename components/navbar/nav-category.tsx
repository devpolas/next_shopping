"use client";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";
import { Skeleton } from "../ui/skeleton";

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
  return (
    <MenubarMenu value={cat.slug} key={cat.slug}>
      <MenubarTrigger className='p-0 lg:px-0.5 xl:px-4 lg:py-1 xl:py-1.5 text-[10px] lg:text-sm 2xl:text-lg xl:tracking-wider hover:cursor-pointer'>
        {cat.name}
      </MenubarTrigger>
      <MenubarContent>
        {cat.subcategory.map((sc) => (
          <MenubarGroup key={sc.slug}>
            <MenubarSub>
              {sc.subcategory.length > 0 ? (
                <MenubarSubTrigger className='font-semibold text-[8px] lg:text-[10px] 2xl:text-[16px] xl:text-sm hover:cursor-pointer'>
                  {sc.name}
                </MenubarSubTrigger>
              ) : (
                <MenubarItem className='font-semibold text-[8px] lg:text-[10px] 2xl:text-[16px] xl:text-sm'>
                  <Link
                    href={`/product?category=${encodeURI(cat.name)}&subCategory=${encodeURI(sc.name)}`}
                  >
                    {sc.name}
                  </Link>
                </MenubarItem>
              )}
              {sc.subcategory.length > 0 && (
                <MenubarSubContent>
                  <MenubarGroup>
                    {sc.subcategory.map((ssc) => (
                      <MenubarItem
                        key={ssc.name}
                        className='font-semibold text-[8px] lg:text-[10px] 2xl:text-[16px] xl:text-sm'
                      >
                        <Link
                          href={`/product?category=${encodeURI(cat.name)}&subCategory=${encodeURI(sc.name)}&subSubCategory=${encodeURI(ssc.name)}`}
                        >
                          {ssc.name}
                        </Link>
                      </MenubarItem>
                    ))}
                  </MenubarGroup>
                </MenubarSubContent>
              )}
            </MenubarSub>
          </MenubarGroup>
        ))}
      </MenubarContent>
    </MenubarMenu>
  );
}

export default function NavCategory({
  categories,
  isLoading,
}: {
  categories: Category[];
  isLoading: boolean;
}) {
  return (
    <section className='flex py-1'>
      <Menubar className='flex md:flex-row flex-col flex-1 justify-between border-0'>
        {isLoading &&
          Array.from({ length: 14 }).map((_, i) => (
            <Skeleton
              key={i}
              className='z-100 w-full h-6 2xl:h-8 animate-pulse'
            />
          ))}
        {categories.length > 0 &&
          !isLoading &&
          categories.map((cat) => <CategoryMenu key={cat.slug} cat={cat} />)}
      </Menubar>
    </section>
  );
}
