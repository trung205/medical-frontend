import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function SolutionsHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[#fafdff] to-[#f5fffe]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Giải pháp công nghệ</h1>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Chúng tôi cung cấp giải pháp toàn diện cho quy trình sản xuất công nghệ sinh học
          </p>
          {/* <Button size="lg">
            Khám phá
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button> */}
        </div>
      </div>
    </section>
  )
}
