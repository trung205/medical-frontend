import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SolutionsHero } from "@/components/solutions-hero"
import { SolutionsServices } from "@/components/solutions-services"
import { SolutionsIntro } from "@/components/solutions-intro"
import { SolutionsTestimonials } from "@/components/solutions-testimonials"
import { SolutionsProjects } from "@/components/solutions-projects"

export default function SolutionsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <SolutionsHero />
      <SolutionsServices />
      <SolutionsIntro />
      {/* <SolutionsTestimonials /> */}
      <SolutionsProjects />
      <Footer />
    </main>
  )
}
