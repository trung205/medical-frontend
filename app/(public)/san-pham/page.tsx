"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";
import { useProducts, useProductsInfinite } from "@/hooks/user/useProducts";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button"; // hoặc tự tạo button
import { useEffect, useState } from "react";
import { CommonPagination } from "@/components/ui/common-pagination";

export default function ProductsPage() {
  // const { id } = params
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);

  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  const { data, isLoading }: any = useProducts({
    page,
    limit: 12,
    sortField: "name",
    sortOrder: "asc",
  });

  const { data: products = [], pagination = {} } = data || {};
  const { totalPages } = pagination || {};
  const handleShowProductDetail = (product: any) => {
    router.push(`/san-pham/chi-tiet/${product?.slug || ""}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Danh Mục Sản Phẩm
          </h1>
          <p className="text-muted-foreground">
            Khám phá bộ sưu tập đầy đủ các sản phẩm chất lượng cao từ các thương
            hiệu uy tín
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters />
          </div>
          <div className="lg:col-span-3">
            {isLoading ? (
              <p>Đang tải...</p>
            ) : (
              <>
                <ProductGrid
                  products={products || []}
                  handleShowProductDetail={handleShowProductDetail}
                />
                <CommonPagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
