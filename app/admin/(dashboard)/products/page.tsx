"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductsTable } from "@/components/admin/products-table";
import Link from "next/link";
import { useProducts } from "@/hooks/admin/useProducts";
import { CommonPagination } from "@/components/ui/common-pagination";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [conditions, setConditions] = useState({
    search: "",
    name: "",
    slug: "",
    origin: "",
    status: "",
    categoryLevel1Id: null,
    categoryLevel2Id: null,
    categoryLevel3Id: null,
  });
  const { data, isLoading } = useProducts({
    page,
    ...conditions,
  });

  const { data: products = [], pagination = {} } = data || {};
  const { totalPages, total } = pagination || {};

  const handleSearch = (name: string, value: string) => {
    setConditions({
      ...conditions,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Quản lý sản phẩm
          </h1>
          <p className="text-muted-foreground mt-1">
            Quản lý thông tin sản phẩm và tồn kho
          </p>
        </div>
        <Link href="/admin/products/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Thêm sản phẩm
          </Button>
        </Link>
      </div>

      <ProductsTable
        data={products}
        handleSearch={handleSearch}
        conditions={conditions}
      />
      <CommonPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}
