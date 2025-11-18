"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";
import { useProducts, useProductsInfinite } from "@/hooks/user/useProducts";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // hoặc tự tạo button
import { useState } from "react";
import { useProductTypes } from "@/hooks/user/useProductTypes";

export default function CategoriesDetailPage({ params }: any) {
  const { productTypeSlug, categorySlug } = params;

  const router = useRouter();
  const { data: productTypesData }: any = useProductTypes(
    {
      search: productTypeSlug,
    },
    {
      enabled: !!productTypeSlug,
    }
  );

  const productType = productTypesData?.data?.[0] || {};

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  }: any = useProductsInfinite({
    categorySlug,
    limit: 6,
  });
  const handleShowProductDetail = (product: any) => {
    router.push(`/san-pham/chi-tiet/${product?.slug || ""}`);
  };

  const formattedProducts =
    products?.pages
      .flatMap((page: any) => page.data)
      .flatMap((item: any) => item.data) || [];

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
                  products={formattedProducts || []}
                  handleShowProductDetail={handleShowProductDetail}
                />
                {hasNextPage && (
                  <div className="text-center mt-8">
                    <Button
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                    >
                      {isFetchingNextPage ? "Đang tải thêm..." : "Tải thêm"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
