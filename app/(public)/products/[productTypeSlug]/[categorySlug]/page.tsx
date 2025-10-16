"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { useProducts, useProductsInfinite } from "@/hooks/user/useProducts"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button" // hoặc tự tạo button
import { useState } from "react"

export default function CategoriesDetailPage({ params }: any) {
  const { productTypeSlug, categorySlug } = params
  // const router = useRouter()

  // const {
  //   data: products,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  //   isLoading,
  // } = useProductsInfinite({
  //   categorySlug: id,
  //   limit: 12,
  // })

  // const handleShowProductDetail = (product: any) => {
  //   router.push(`/products/${product?.slug || ""}`)
  // }
   const router = useRouter()

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  }: any = useProductsInfinite({
    categorySlug,
    limit: 6,
  })
  console.log("products", products)
  const handleShowProductDetail = (product: any) => {
    router.push(`/products/detail/${product?.slug || ""}`)
  }


  const formattedProducts =
    products?.pages.flatMap((page: any) => page.data).flatMap((item: any) => item.data) || []
  console.log("hasNextPage", hasNextPage)
  console.log("formattedProducts", formattedProducts)

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Danh Mục Thiết Bị Y Tế
          </h1>
          <p className="text-muted-foreground">
            Khám phá bộ sưu tập đầy đủ các thiết bị y tế chất lượng cao từ các thương hiệu uy tín
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters productTypeSlug={productTypeSlug} slug={categorySlug} />
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
  )
}
