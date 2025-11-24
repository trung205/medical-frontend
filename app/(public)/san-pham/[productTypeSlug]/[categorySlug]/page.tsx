"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";
import { useProducts } from "@/hooks/user/useProducts";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProductTypes } from "@/hooks/user/useProductTypes";
import { CommonPagination } from "@/components/ui/common-pagination";

export default function CategoriesDetailPage({ params }: any) {
  const { productTypeSlug, categorySlug } = params;

  const router = useRouter();
  const searchParams = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);

  const { data: productTypesData }: any = useProductTypes(
    {
      search: productTypeSlug,
    },
    {
      enabled: !!productTypeSlug,
    }
  );

  const productType = productTypesData?.data?.[0] || {};

  const { data, isLoading }: any = useProducts({
    page,
    limit: 12,
    sortField: "name",
    sortOrder: "asc",
    productTypeSlug,
    categorySlug,
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

  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);
  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <h1 className="text-5xl font-bold text-foreground  text-center ">
          {productType?.name || ""}
        </h1>
      </section>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters
              productTypeSlug={productTypeSlug}
              slug={categorySlug}
            />
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
