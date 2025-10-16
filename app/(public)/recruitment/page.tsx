import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RecruitmentHero } from "@/components/recruitment-hero"
import { RecruitmentForm } from "@/components/recruitment-form"
import { RecruitmentBenefits } from "@/components/recruitment-benefits"

export default function RecruitmentPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <RecruitmentHero />
      <RecruitmentForm />
      <RecruitmentBenefits />
      <Footer />
    </main>
  )
}
