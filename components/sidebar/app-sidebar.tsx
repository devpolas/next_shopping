"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  Settings2Icon,
  SearchIcon,
  MessageSquareHeart,
  Gift,
  CreditCard,
  ShieldUser,
  Users,
  UserLock,
  MessagesSquare,
} from "lucide-react";
import { TooltipProvider } from "../ui/tooltip";
import { NavMain } from "./nav-main";
import { NavDocuments } from "./nav-teams";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import Logo from "../logo/logo";
import { authClient } from "@/lib/auth-client";
import Loading from "@/app/loading";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: <ListIcon />,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: <ChartBarIcon />,
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: <Gift />,
    },
    {
      title: "Reviews",
      url: "/dashboard/reviews",
      icon: <MessageSquareHeart />,
    },
    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: <CreditCard />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings2Icon />,
    },
    {
      title: "All Feedbacks",
      url: "/dashboard/feedbacks",
      icon: <MessagesSquare />,
    },
    {
      title: "Search",
      url: "/dashboard/search",
      icon: <SearchIcon />,
    },
  ],
  documents: [
    {
      title: "Admin Team",
      url: "/dashboard/admin",
      icon: <ShieldUser />,
    },
    {
      title: "Moderator Team",
      url: "/dashboard/moderator",
      icon: <UserLock />,
    },
    {
      title: "All Users",
      url: "/dashboard/users",
      icon: <Users />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = authClient.useSession();
  return (
    <TooltipProvider>
      <Sidebar collapsible='offcanvas' {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className='data-[slot=sidebar-menu-button]:p-1.5!'
              >
                <Logo />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavDocuments items={data.documents} />
          <NavSecondary items={data.navSecondary} className='mt-auto' />
        </SidebarContent>
        <SidebarFooter>
          {session.isPending ? <Loading /> : <NavUser />}
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
