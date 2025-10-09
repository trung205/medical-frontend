import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicesHero } from "@/components/services-hero"
import { ServicesList } from "@/components/services-list"
import { ServiceProcess } from "@/components/service-process"
import { ServicePackages } from "@/components/service-packages"
import { ServiceTestimonials } from "@/components/service-testimonials"

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ServicesHero />
      <ServicesList />
      <ServiceProcess />
      <ServicePackages />
      <ServiceTestimonials />
      <Footer />
    </main>
  )
}
