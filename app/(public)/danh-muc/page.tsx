import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"

export default function CategoriesPage({
  params
}: any) {
  const { id } = params;
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Danh Mục Thiết Bị Y Tế</h1>
          <p className="text-muted-foreground">
            Khám phá bộ sưu tập đầy đủ các thiết bị y tế chất lượng cao từ các thương hiệu uy tín
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters slug={id} />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
