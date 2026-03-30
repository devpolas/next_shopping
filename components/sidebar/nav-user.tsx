"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { signOut } from "@/lib/actions/auth.actions";
import { authClient } from "@/lib/auth-client";
import { getInitials } from "@/lib/get-initials";
import {
  EllipsisVerticalIcon,
  CircleUserRoundIcon,
  BellIcon,
  LogOutIcon,
  Home,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function NavUser() {
  const router = useRouter();
  const { isMobile } = useSidebar();

  const session = authClient.useSession();
  const user = session.data?.user;

  if (!user) {
    return null;
  }

  async function handleSignout() {
    const res = await signOut();
    if (res.success && res.redirectTo) {
      router.push("/signin");
      router.refresh();
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='grayscale rounded-lg w-8 h-8'>
                <AvatarImage
                  src={`${user.image}` || undefined}
                  alt={user.name}
                />
                <AvatarFallback className='rounded-lg'>
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 grid text-sm text-left leading-tight'>
                <span className='font-medium truncate'>{user?.name}</span>
                <span className='text-muted-foreground text-xs truncate'>
                  {user?.email}
                </span>
              </div>
              <EllipsisVerticalIcon className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? "bottom" : "right"}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-sm text-left'>
                <Avatar className='rounded-lg w-8 h-8'>
                  <AvatarImage src={user.image || undefined} alt={user.name} />
                  <AvatarFallback className='rounded-lg'>
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1 grid text-sm text-left leading-tight'>
                  <span className='font-medium truncate'>{user.name}</span>
                  <span className='text-muted-foreground text-xs truncate'>
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={"/"} className='hover:cursor-pointer'>
                  <Home />
                  Return to Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/profile"} className='hover:cursor-pointer'>
                  <CircleUserRoundIcon />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={"/dashboard/notifications"}
                  className='hover:cursor-pointer'
                >
                  <BellIcon />
                  Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignout}
              className='text-red-500 hover:text-muted hover:cursor-pointer'
            >
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
