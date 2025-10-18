"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import { RelatedProducts } from "@/components/related-products"
import { notFound } from "next/navigation"
import { useProduct } from "@/hooks/user/useProducts"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug }: any = params;
  // const product = products.find((p) => p.slug === slug)

  const {data: productData}: any = useProduct(slug);

  const {data: relatedProductsData}: any = useProduct(slug);

  console.log(relatedProductsData);

  // if (!product) {
  //   notFound()
  // }

  return (
    <main className="min-h-screen">
      <Header />
      <ProductDetail product={relatedProductsData} />
      {/* <RelatedProducts currentProductId={product.id} /> */}
      <Footer />
    </main>
  )
}
