import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogDetail } from "@/components/blog-detail"

export default function BlogDetailPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <BlogDetail />
      <Footer />
    </main>
  )
}
