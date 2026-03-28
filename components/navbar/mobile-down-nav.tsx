"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BadgePercent, CircleUserRound } from "lucide-react";
import Cart from "./cart";
import Favorite from "./favorite";
import { usePathname, useRouter } from "next/navigation";

const navItem =
  "flex flex-col flex-1 justify-center items-center py-6 border-y-0! border-l-0! rounded-none! text-xs text-center select-none";

export default function MobileDownNav() {
  const router = useRouter();
  const pathname = usePathname();

  function getValue(path: string) {
    if (path.startsWith("/cart")) return "cart";
    if (path.startsWith("/offer")) return "offer";
    if (path.startsWith("/favorite")) return "favorite";
    if (path.startsWith("/profile")) return "profile";
    return "";
  }

  return (
    <div className='md:hidden right-0 bottom-0 left-0 fixed bg-background shadow-md border-t w-full'>
      <ToggleGroup
        type='single'
        defaultValue='top'
        variant='outline'
        className='flex w-full' // Full width & 5rem height
        value={getValue(pathname)}
        onValueChange={(value) => {
          if (!value) return;

          const routes = {
            cart: "/cart",
            offer: "/offer",
            favorite: "/favorite",
            profile: "/profile",
          };

          router.push(routes[value as keyof typeof routes]);
        }}
      >
        <ToggleGroupItem
          value='cart'
          aria-label='Toggle top'
          className={navItem}
        >
          <Cart />
          <p>Cart</p>
        </ToggleGroupItem>

        <ToggleGroupItem
          value='offer'
          aria-label='Toggle bottom'
          className={navItem}
        >
          <BadgePercent />
          <p>Offer</p>
        </ToggleGroupItem>

        <ToggleGroupItem
          value='favorite'
          aria-label='Toggle left'
          className={navItem}
        >
          <Favorite />
          <p>Favorite</p>
        </ToggleGroupItem>

        <ToggleGroupItem
          value='profile'
          aria-label='Toggle right'
          className={navItem}
        >
          <CircleUserRound />
          <p>Account</p>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
