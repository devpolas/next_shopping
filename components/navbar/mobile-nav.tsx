import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDownIcon, Menu } from "lucide-react";
import MobileLogo from "../logo/logo-mobile";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import Link from "next/link";
import { Button } from "../ui/button";
import { Category } from "@/types/product";

export default function MobileNav({ categories }: { categories: Category[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon-sm'>
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle className='hidden'>Menu</SheetTitle>
          <SheetDescription className='hidden'>Description</SheetDescription>
          <div className='flex justify-center items-center'>
            <MobileLogo />
          </div>
          <hr />
        </SheetHeader>

        <div className='flex flex-col gap-2 px-4 overflow-y-auto'>
          {categories.map((cat) => {
            const subCat = cat.subCategories ?? [];
            return (
              <Collapsible key={cat.slug} className='group/collapsible'>
                <CollapsibleTrigger asChild>
                  <Button variant='ghost' className='group w-full text-lg'>
                    {cat.name}
                    <ChevronDownIcon className='ml-auto group-data-[state=open]:rotate-180' />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className='flex flex-col border-l-2'>
                  <div className='flex flex-col gap-1 ml-4 p-1'>
                    {subCat.map((sc) => {
                      const subSubCat = sc.subSubCategories ?? [];
                      return (
                        subSubCat.length === 0 && (
                          <Link
                            className='text-lg'
                            href={`/product?category=${encodeURIComponent(cat.slug)}&subCategory=${encodeURIComponent(sc.slug)}`}
                            key={sc.slug}
                          >
                            {sc.name}
                          </Link>
                        )
                      );
                    })}
                  </div>

                  {subCat.map((sc) => {
                    const subSubCat = sc.subSubCategories ?? [];
                    return (
                      subSubCat.length > 0 && (
                        <Collapsible
                          key={sc.slug}
                          className='group/collapsible ml-4'
                        >
                          <CollapsibleTrigger asChild>
                            <Button
                              variant='ghost'
                              className='group w-full text-[16px]'
                            >
                              {sc.name}
                              <ChevronDownIcon className='ml-auto group-data-[state=open]:rotate-180' />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className='border-l-2'>
                            <div className='flex flex-col gap-2 ml-4 p-1'>
                              {subSubCat.map((ssc) => (
                                <Link
                                  className='text-[16px]'
                                  href={`/product?category=${encodeURIComponent(cat.slug)}&subCategory=${encodeURIComponent(sc.slug)}&subSubCategory=${encodeURIComponent(ssc.slug)}`}
                                  key={ssc.slug}
                                >
                                  {ssc.name}
                                </Link>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
