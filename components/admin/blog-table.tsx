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
import { Pencil, Trash2, ArrowUpDown, Eye, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Blog = {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  status: string
  featured: boolean
  image: string
  publishedAt: string | null
  views: number
}

interface BlogTableProps {
  data: Blog[]
  onDelete: (id: string) => void
}

export function BlogTable({ data, onDelete }: BlogTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const columns: ColumnDef<Blog>[] = [
    {
      accessorKey: "image",
      header: "Hình ảnh",
      cell: ({ row }) => (
        <div className="w-20 h-14 relative rounded-lg overflow-hidden bg-muted">
          <Image
            src={row.getValue("image") || "/placeholder.svg"}
            alt={row.original.title}
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Tiêu đề
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="max-w-md">
          <div className="font-medium flex items-center gap-2">
            {row.getValue("title")}
            {row.original.featured && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />}
          </div>
          <div className="text-sm text-muted-foreground line-clamp-1">{row.original.excerpt}</div>
        </div>
      ),
    },
    {
      accessorKey: "author",
      header: "Tác giả",
      cell: ({ row }) => <span className="text-sm">{row.getValue("author")}</span>,
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "published" ? "default" : "secondary"}>
            {status === "published" ? "Đã xuất bản" : "Bản nháp"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "publishedAt",
      header: "Ngày xuất bản",
      cell: ({ row }) => {
        const date = row.getValue("publishedAt") as string | null
        return date ? new Date(date).toLocaleDateString("vi-VN") : "-"
      },
    },
    {
      accessorKey: "views",
      header: "Lượt xem",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Eye className="w-4 h-4" />
          <span>{row.getValue("views")}</span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Link href={`/admin/blog/edit/${row.original.id}`}>
              <Button variant="ghost" size="icon">
                <Pencil className="w-4 h-4" />
              </Button>
            </Link>
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
          placeholder="Tìm kiếm bài viết..."
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
