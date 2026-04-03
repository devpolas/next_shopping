import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";
import * as z from "zod";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { productSchema } from "./table-schema";

export function TableCellViewer({
  item,
}: {
  item: z.infer<typeof productSchema>;
}) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant='link' className='px-0 w-fit text-foreground text-left'>
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>{item.name}</DrawerTitle>
        </DrawerHeader>
        <div className='flex flex-col gap-4 px-4 overflow-y-auto text-sm'>
          <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' defaultValue={item.name} />
            </div>
            <div className='gap-4 grid grid-cols-2'>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='gender'>Gender</Label>
                <Select defaultValue={item.gender}>
                  <SelectTrigger id='gender' className='w-full'>
                    <SelectValue placeholder='Select Gender' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='men'>Man</SelectItem>
                      <SelectItem value='women'>Women</SelectItem>
                      <SelectItem value='unisex'>Unisex</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='activeStatus'>Status</Label>
                <Select defaultValue={item.isActive ? "true" : "false"}>
                  <SelectTrigger id='activeStatus' className='w-full'>
                    <SelectValue placeholder='Active Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='true'>True</SelectItem>
                      <SelectItem value='false'>False</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='gap-4 grid grid-cols-2'>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='isFeatured'>Featured</Label>
                <Select defaultValue={item.isFeatured ? "true" : "false"}>
                  <SelectTrigger id='isFeatured' className='w-full'>
                    <SelectValue placeholder='Featured Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='true'>True</SelectItem>
                      <SelectItem value='false'>False</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='isNew'>New</Label>
                <Select defaultValue={item.isNew ? "true" : "false"}>
                  <SelectTrigger id='isNew' className='w-full'>
                    <SelectValue placeholder='New Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='true'>True</SelectItem>
                      <SelectItem value='false'>False</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='reviewer'>Reviewer</Label>
              {/* <Select defaultValue={item.}>
                <SelectTrigger id='reviewer' className='w-full'>
                  <SelectValue placeholder='Select a reviewer' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='Eddie Lake'>Eddie Lake</SelectItem>
                    <SelectItem value='Jamik Tashpulatov'>
                      Jamik Tashpulatov
                    </SelectItem>
                    <SelectItem value='Emily Whalen'>Emily Whalen</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select> */}
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant='outline'>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
