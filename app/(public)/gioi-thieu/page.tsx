import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about-hero"
import { CompanyStats } from "@/components/company-stats"
import { TeamSection } from "@/components/team-section"
import { CertificationsSection } from "@/components/certifications-section"
import { CompanyHistory } from "@/components/company-history"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* <AboutHero /> */}
      <CompanyStats />
      {/* <CompanyHistory /> */}
      <CertificationsSection />
      <TeamSection />
      <Footer />
    </main>
  )
}
