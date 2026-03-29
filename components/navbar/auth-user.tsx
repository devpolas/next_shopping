"use client";

import {
  BadgeCheckIcon,
  CircleUserRound,
  HistoryIcon,
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
import { authClient } from "../../lib/auth-client";
import { signOut } from "@/lib/actions/auth.actions";
import { getInitials } from "@/lib/get-initials";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/user";

function DropDownWithAuth({
  user,
  handleSignout,
}: {
  user: UserType;
  handleSignout: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='flex justify-center items-center p-0 rounded-full'
        >
          <Avatar className='w-6 h-6'>
            <AvatarImage
              src={user?.image || undefined}
              alt={user?.name || "User"}
              className='object-cover'
            />
            <AvatarFallback className='flex justify-center items-center'>
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-48'>
        <div className='px-2 py-1.5 text-muted-foreground text-sm'>
          {user?.email}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link
            href={"/profile"}
            className='hover:underline hover:cursor-pointer'
          >
            <DropdownMenuItem className='hover:cursor-pointer'>
              <BadgeCheckIcon className='mr-2 w-4 h-4' />
              Profile
            </DropdownMenuItem>
          </Link>

          {user?.role === "USER" && (
            <Link
              href={"/history"}
              className='hover:underline hover:cursor-pointer'
            >
              <DropdownMenuItem className='hover:cursor-pointer'>
                <HistoryIcon className='mr-2 w-4 h-4' />
                Purchase History
              </DropdownMenuItem>
            </Link>
          )}
          {user?.role === "MODERATOR" && (
            <Link
              href={"/dashboard"}
              className='hover:underline hover:cursor-pointer'
            >
              <DropdownMenuItem className='hover:cursor-pointer'>
                <HistoryIcon className='mr-2 w-4 h-4' />
                Dashboard
              </DropdownMenuItem>
            </Link>
          )}
          {user?.role === "ADMIN" && (
            <Link
              href={"/dashboard"}
              className='hover:underline hover:cursor-pointer'
            >
              <DropdownMenuItem className='hover:cursor-pointer'>
                <HistoryIcon className='mr-2 w-4 h-4' />
                Dashboard
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='text-red-500 hover:cursor-pointer'
          onClick={handleSignout}
        >
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
  const router = useRouter();
  const session = authClient.useSession();
  const user = session.data?.user;

  function handleSignout() {
    signOut();
    router.push("/signin");
    router.refresh();
  }

  if (session.isPending) return null; // or spinner
  return user ? (
    <DropDownWithAuth handleSignout={handleSignout} user={user} />
  ) : (
    <DropdownWithoutAuth />
  );
}
