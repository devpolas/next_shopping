import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { orderSchema } from "./table-schema";
import * as z from "zod";
import React from "react";
import useColumn from "./column";

export default function OrderTable({
  data: initialData,
}: {
  data: z.infer<typeof orderSchema>[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const { orderColumns } = useColumn();
  const table = useReactTable({
    data,
    columns: orderColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <div></div>;
}
