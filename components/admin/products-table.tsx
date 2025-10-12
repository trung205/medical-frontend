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
import { Pencil, Trash2, ArrowUpDown, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Product = {
  id: string
  name: string
  slug: string
  sku: string
  price: number
  salePrice: number | null
  stock: number
  categoryId: string
  categoryName: string
  status: string
  featured: boolean
  images: string[]
  description: string
}

interface ProductsTableProps {
  data: Product[]
}

const LINK_API_URL = process.env.NEXT_PUBLIC_API_URL

export function ProductsTable({ data, handleSearch, conditions }: any) {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      console.log("[v0] Delete product:", id)
    }
  }

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "images",
      header: "Hình ảnh",
      cell: ({ row }) => {
        const images: any = row.getValue("images") as string[]
        const mainImage = images && images.length > 0 ? `${LINK_API_URL}/products/${images[0].productId}/images/${images[0].id}` : "/placeholder.svg"
        return (
          <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
            <Image src={mainImage || "/placeholder.svg"} alt={row.original.name} fill className="object-cover" />
            {images && images.length > 1 && (
              <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-tl">
                +{images.length - 1}
              </div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Tên sản phẩm
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div>
          <div className="font-medium flex items-center gap-2">
            {row.getValue("name")}
            {row.original.featured && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
          </div>
          <div className="text-sm text-muted-foreground">{row.original.sku}</div>
        </div>
      ),
    },
    {
      accessorKey: "categoryLevel3",
      header: "Danh mục",
      cell: ({ row }: any) => (
        <Badge variant="secondary">
          {row.getValue("categoryLevel3")?.name  || row.getValue("categoryLevel2")?.name || row.getValue("categoryLevel1")?.name || ''}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "active" ? "default" : "secondary"}>
            {status === "active" ? "Đang bán" : "Ngừng bán"}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Link href={`/admin/products/edit/${row.original.id}`}>
              <Button variant="ghost" size="icon">
                <Pencil className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: data || [],
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
          placeholder="Tìm kiếm sản phẩm..."
          value={conditions?.search}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups()?.map((headerGroup) => (
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
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows.map((row) => (
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
