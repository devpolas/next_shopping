import { type ColumnDef } from "@tanstack/react-table";
import * as z from "zod";

import { tableSchema } from "./table";
import { DragHandle } from "./drag/drag";
import { Checkbox } from "../ui/checkbox";
import { TableCellViewer } from "./table-cell-viewer";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon } from "lucide-react";

export default function useColumn() {
  const columns: ColumnDef<z.infer<typeof tableSchema>>[] = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
      id: "select",
      header: ({ table }) => (
        <div className='flex justify-center items-center'>
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label='Select all'
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className='flex justify-center items-center'>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Select row'
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "header",
      header: "Header",
      cell: ({ row }) => {
        return <TableCellViewer item={row.original} />;
      },
      enableHiding: false,
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => (
        <div className='w-32'>
          <Badge variant='outline' className='px-1.5 text-muted-foreground'>
            {row.original.brand?.name}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <p>{row.original.price}</p>,
    },
    {
      accessorKey: "discountPrice",
      header: "Discount",
      cell: ({ row }) => <p>{row.original.discountPrice}</p>,
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => <p>{row.original.gender}</p>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        <p>{row.original.category.name}</p>;
      },
    },
    {
      accessorKey: "subCategory",
      header: "SubCategory",
      cell: ({ row }) => {
        <p>{row.original.subCategory.name}</p>;
      },
    },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='flex data-[state=open]:bg-muted size-8 text-muted-foreground'
              size='icon'
            >
              <EllipsisVerticalIcon />
              <span className='sr-only'>Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-32'>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return { columns };
}
