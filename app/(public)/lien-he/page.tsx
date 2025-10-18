import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { LocationMap } from "@/components/location-map"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactHero />
      <div className=" px-4 py-16 bg-[#e5eff3]">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
          <ContactForm />
          {/* <ContactInfo /> */}
        </div>
      </div>
      {/* <LocationMap /> */}
      <Footer />
    </main>
  )
}
