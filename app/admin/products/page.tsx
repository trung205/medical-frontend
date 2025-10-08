"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ProductsTable } from "@/components/admin/products-table"
import Link from "next/link"

const mockProducts = [
  {
    id: "1",
    name: "Máy siêu âm 4D GE Voluson E10",
    sku: "US-GE-V10",
    price: 2500000000,
    salePrice: 2300000000,
    stock: 5,
    categoryId: "3",
    categoryName: "Siêu âm 4D",
    status: "active" as const,
    featured: true,
    images: ["/ultrasound-machine-medical-equipment.jpg"],
    description: "Máy siêu âm 4D cao cấp",
  },
]

export default function ProductsPage() {
  const [products] = useState(mockProducts)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground mt-1">Quản lý thông tin sản phẩm và tồn kho</p>
        </div>
        <Link href="/admin/products/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Thêm sản phẩm
          </Button>
        </Link>
      </div>

      <ProductsTable data={products} />
    </div>
  )
}
