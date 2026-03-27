import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BadgePercent, CircleUserRound } from "lucide-react";
import Cart from "./cart";
import Favorite from "./favorite";

export default function MobileDownNav() {
  return (
    <div className='md:hidden right-0 bottom-0 left-0 fixed bg-background shadow-md border-t w-full'>
      <ToggleGroup
        type='single'
        defaultValue='top'
        variant='outline'
        className='flex w-full' // Full width & 5rem height
      >
        <ToggleGroupItem
          value='top'
          aria-label='Toggle top'
          className='flex flex-col flex-1 justify-center items-center py-6 border-y-0! border-l-0! rounded-none! text-xs text-center select-none'
        >
          <Cart />
          <p>Cart</p>
        </ToggleGroupItem>
        <ToggleGroupItem
          value='bottom'
          aria-label='Toggle bottom'
          className='flex flex-col flex-1 justify-center items-center py-6 border-y-0! text-xs text-center select-none'
        >
          <BadgePercent />
          <p>Offer</p>
        </ToggleGroupItem>
        <ToggleGroupItem
          value='left'
          aria-label='Toggle left'
          className='flex flex-col flex-1 justify-center items-center py-6 border-y-0! text-xs text-center select-none'
        >
          <Favorite />
          <p>Favorites</p>
        </ToggleGroupItem>
        <ToggleGroupItem
          value='right'
          aria-label='Toggle right'
          className='flex flex-col flex-1 justify-center items-center py-6 border-y-0! border-r-0! rounded-none! text-xs text-center select-none'
        >
          <CircleUserRound />
          <p>Account</p>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
