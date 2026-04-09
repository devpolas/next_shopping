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
import { Category } from "@/types/product";

function CategoryMenu({ cat }: { cat: Category }) {
  const subCat = cat.subCategories ?? [];
  return (
    <MenubarMenu value={cat.slug}>
      <MenubarTrigger className='p-0 lg:px-0.5 xl:px-4 lg:py-1 xl:py-1.5 text-[10px] lg:text-sm 2xl:text-lg xl:tracking-wider hover:cursor-pointer'>
        {cat.name}
      </MenubarTrigger>
      <MenubarContent>
        {subCat.map((sc) => {
          const subSubCat = sc.subSubCategories ?? [];
          return (
            <MenubarGroup key={sc.slug}>
              <MenubarSub>
                {subSubCat.length > 0 ? (
                  <MenubarSubTrigger className='font-semibold text-[8px] lg:text-[10px] 2xl:text-[16px] xl:text-sm hover:cursor-pointer'>
                    {sc.name}
                  </MenubarSubTrigger>
                ) : (
                  <MenubarItem
                    asChild
                    className='font-semibold text-[8px] lg:text-[10px] 2xl:text-[16px] xl:text-sm hover:cursor-pointer'
                  >
                    <Link
                      href={`/product?category=${encodeURIComponent(cat.name)}&subCategory=${encodeURIComponent(sc.name)}`}
                    >
                      {sc.name}
                    </Link>
                  </MenubarItem>
                )}
                {subSubCat.length > 0 && (
                  <MenubarSubContent>
                    <MenubarGroup>
                      {subSubCat.map((ssc) => (
                        <MenubarItem
                          asChild
                          key={ssc.slug}
                          className='font-semibold text-[8px] lg:text-[10px] xl:text-sm hover:cursor-pointer'
                        >
                          <Link
                            href={`/product?category=${encodeURIComponent(cat.name)}&subCategory=${encodeURIComponent(sc.name)}&subSubCategory=${encodeURIComponent(ssc.name)}`}
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
          );
        })}
      </MenubarContent>
    </MenubarMenu>
  );
}

export default function NavCategory({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className='hidden md:flex py-1'>
      <Menubar className='flex md:flex-row flex-col flex-1 justify-between border-0'>
        {categories.map((cat) => (
          <CategoryMenu key={cat.slug} cat={cat} />
        ))}
      </Menubar>
    </section>
  );
}
