"use client";

import {
  BadgeCheckIcon,
  BellIcon,
  CircleUserRound,
  CreditCardIcon,
  LogOutIcon,
  UserKey,
  UserPlus,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

function DropDownWithAuth() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-48'>
        {/* Optional user info */}
        <div className='px-2 py-1.5 text-muted-foreground text-sm'>
          user@email.com
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheckIcon className='mr-2 w-4 h-4' />
            Account
          </DropdownMenuItem>

          <DropdownMenuItem>
            <CreditCardIcon className='mr-2 w-4 h-4' />
            Billing
          </DropdownMenuItem>

          <DropdownMenuItem>
            <BellIcon className='mr-2 w-4 h-4' />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='text-red-500'>
          <LogOutIcon className='mr-2 w-4 h-4' />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DropdownWithoutAuth() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type='button'
          title='button'
          className='flex justify-center items-center p-0 rounded-full outline-0 ring-offset-0 w-6 h-6 hover:cursor-pointer'
        >
          <CircleUserRound className='w-5 h-5' />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-32'>
        <DropdownMenuItem asChild>
          <Link
            href='/signin'
            className='flex items-center gap-2 hover:underline hover:cursor-pointer'
          >
            <UserKey className='w-4 h-4' />
            Signin
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href='/signup'
            className='flex items-center gap-2 hover:underline hover:cursor-pointer'
          >
            <UserPlus className='w-4 h-4' />
            Signup
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function AuthButton() {
  const user = null;

  return user ? <DropDownWithAuth /> : <DropdownWithoutAuth />;
}
