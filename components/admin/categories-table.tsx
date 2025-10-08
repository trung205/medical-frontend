"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, ArrowUpDown } from "lucide-react"

type Category = {
  id: string
  name: string
  slug: string
  parentId: string | null
  level: number
  order: number
}

interface CategoriesTableProps {
  data: Category[]
  onEdit: (category: Category) => void
  onDelete: (id: string) => void
}

export function CategoriesTable({ data, onEdit, onDelete }: CategoriesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Tên danh mục
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const level = row.original.level
        const indent = (level - 1) * 24
        return (
          <div style={{ paddingLeft: `${indent}px` }} className="font-medium">
            {row.getValue("name")}
          </div>
        )
      },
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("slug")}</span>,
    },
    {
      accessorKey: "level",
      header: "Cấp độ",
      cell: ({ row }) => {
        const level = row.getValue("level") as number
        const variants = {
          1: "default",
          2: "secondary",
          3: "outline",
        } as const
        const labels = {
          1: "Cấp 1",
          2: "Cấp 2",
          3: "Cấp 3",
        }
        return <Badge variant={variants[level as keyof typeof variants]}>{labels[level as keyof typeof labels]}</Badge>
      },
    },
    {
      accessorKey: "order",
      header: "Thứ tự",
      cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("order")}</span>,
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(row.original)}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(row.original.id)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Tìm kiếm danh mục..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
