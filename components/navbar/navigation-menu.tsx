"use client";
import { SearchIcon } from "lucide-react";
import Logo from "../logo/logo";
import AuthButton from "./auth-user";
import Cart from "./cart";
import Favorite from "./favorite";
import { Search } from "./search";
import { Suspense, useState } from "react";
import { ThemeSwitcher } from "../theme/theme-switcher";
import LoadingSpinner from "../spinner/loading-spinner";

function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className='relative'>
      <div className='z-10 relative flex justify-between items-center gap-4 py-4'>
        <div className='flex flex-row items-center gap-4'>
          <Logo />
          <ThemeSwitcher />
        </div>

        <div className='hidden md:flex flex-1 max-w-xl'>
          <Search />
        </div>

        <div className='flex flex-row items-center gap-6'>
          <div className='hidden md:flex'>
            <Cart />
          </div>

          <div className='md:hidden'>
            <SearchIcon
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className='w-5 h-5 cursor-pointer'
            />
          </div>
          <div className='hidden md:flex'>
            <Favorite />
          </div>

          <div className='hidden md:flex'>
            <AuthButton />
          </div>
        </div>
      </div>

      {/* Mobile search overlay */}
      {isSearchOpen && (
        <div className='md:hidden top-full left-0 z-20 absolute bg-background shadow-md px-4 py-4 w-full'>
          <Search />
        </div>
      )}
    </div>
  );
}

export default function NavigationMenu() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Navigation />
    </Suspense>
  );
}
