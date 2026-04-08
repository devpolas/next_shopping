"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import NavCategory from "./nav-category";
import NavHeader from "./nav-header";
import useNavData from "@/hooks/use-nav-data";

export function Navbar() {
  const isMobile = useIsMobile();

  const { loading, categories } = useNavData();

  return (
    <nav className='relative w-full'>
      <div className='flex flex-col bg-background px-2 md:px-10'>
        <NavHeader />

        {!isMobile && (
          <NavCategory isLoading={loading} categories={categories} />
        )}
      </div>
    </nav>
  );
}
