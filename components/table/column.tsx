import { type ColumnDef } from "@tanstack/react-table";
import * as z from "zod";

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
import { orderSchema, productSchema } from "./table-schema";

export default function useColumn() {
  const productColumns: ColumnDef<z.infer<typeof productSchema>>[] = [
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
      header: "Product Name",
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
      cell: ({ row }) => <p>{row.original.category.name}</p>,
    },
    {
      accessorKey: "subCategory",
      header: "SubCategory",
      cell: ({ row }) => <p>{row.original.subCategory.name}</p>,
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

  const orderColumns: ColumnDef<z.infer<typeof orderSchema>>[] = [
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
      id: "user",
      accessorKey: "user",
      header: "Order By",
      cell: ({ row }) => (
        <p>{`${row.original.user.name} - ${row.original.phone}`}</p>
      ),
    },
    {
      id: "price",
      header: "Total Amount",
      accessorKey: "totalAmount",
      cell: ({ row }) => <p>{row.original.totalAmount}</p>,
    },
    {
      id: "header",
      accessorKey: "items",
      header: "Products",
      cell: ({ row }) => (
        <p>
          {row.original.items.map((item) => (
            <p key={item.id}>{item.product.name}</p>
          ))}
        </p>
      ),
    },
    {
      id: "address",
      accessorKey: "address",
      header: "Send Address",
      cell: ({ row }) => (
        <p>{`${row.original.address} - ${row.original.postalCode}, ${row.original.city},${row.original.country}`}</p>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => <p>{row.original.status}</p>,
    },
    {
      id: "payment",
      accessorKey: "payment",
      header: "Payment",
      cell: ({ row }) => (
        <p>
          {row.original.payment?.method
            ? `${row.original.payment.transactionId} - ${row.original.payment.method}`
            : row.original.payment?.status}
        </p>
      ),
    },
  ];

  return { productColumns, orderColumns };
}
