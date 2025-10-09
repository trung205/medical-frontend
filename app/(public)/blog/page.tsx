import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogHero } from "@/components/blog-hero"
import { BlogGrid } from "@/components/blog-grid"

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <BlogHero />
      <BlogGrid />
      <Footer />
    </main>
  )
}
