"use client";
import {
  Sheet,
  SheetContent,
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
import Loading from "@/app/loading";
import useNavData from "@/hooks/use-nav-data";

export default function MobileNav() {
  const { loading, categories } = useNavData();

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
          <div className='flex justify-center items-center'>
            <MobileLogo />
          </div>
          <hr />
        </SheetHeader>

        {loading && (
          <div className='flex justify-center items-center'>
            <Loading />
          </div>
        )}

        {categories.length > 0 && !loading && (
          <div className='flex flex-col gap-2 px-4 overflow-y-auto'>
            {categories.map((cat) => (
              <Collapsible key={cat.slug} className='group/collapsible'>
                <CollapsibleTrigger asChild>
                  <Button variant='ghost' className='group w-full text-lg'>
                    {cat.name}
                    <ChevronDownIcon className='ml-auto group-data-[state=open]:rotate-180' />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className='flex flex-col border-l-2'>
                  <div className='flex flex-col gap-1 ml-4 p-1'>
                    {cat.subcategory.map(
                      (sc) =>
                        sc.subcategory.length === 0 && (
                          <Link
                            className='text-lg'
                            href={`/product?category=${cat.name}&subCategory=${sc.name}`}
                            key={sc.slug}
                          >
                            {sc.name}
                          </Link>
                        ),
                    )}
                  </div>

                  {cat.subcategory.map(
                    (sc) =>
                      sc.subcategory.length > 0 && (
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
                              {sc.subcategory.map((ssc) => (
                                <Link
                                  className='text-[16px]'
                                  href={`/product?category=${cat.name}&subCategory=${sc.name}&subSubCategory=${ssc.name}`}
                                  key={ssc.slug}
                                >
                                  {ssc.name}
                                </Link>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ),
                  )}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
