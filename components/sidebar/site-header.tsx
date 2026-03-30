"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];

  const dashboardTitle = segment
    ? segment.charAt(0).toUpperCase() + segment.slice(1)
    : "Dashboard";
  return (
    <header className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex items-center gap-1 lg:gap-2 px-4 lg:px-6 w-full'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4'
        />
        <h1 className='font-medium text-base'>{dashboardTitle}</h1>
      </div>
    </header>
  );
}
