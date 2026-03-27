"use client";
import Logo from "../logo/logo";
import AuthButton from "./auth-user";
import Cart from "./cart";
import Favorite from "./favorite";
import { Search } from "./search";

export default function NavigationMenu() {
  return (
    <div className='flex justify-between items-center gap-4 py-4'>
      {/* Left */}
      <Logo />

      {/* Center */}
      <div className='flex-1 max-w-xl'>
        <Search />
      </div>

      <div className='flex flex-row items-center gap-2'>
        <Cart />
        <Favorite />
        <AuthButton />
      </div>

      {/* Right */}
    </div>
  );
}
