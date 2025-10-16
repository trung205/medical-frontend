import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Thiết bị lên men",
    description: "Giải pháp thiết bị lên men quy mô công nghiệp cho sản xuất sinh học",
    image: "/fermentation-tank-bioreactor.jpg",
  },
  {
    title: "Giải pháp toàn diện",
    description: "Hệ thống tích hợp từ nguyên liệu đến sản phẩm hoàn chỉnh",
    image: "/industrial-biotech-facility.jpg",
  },
  {
    title: "Công nghệ tiên tiến",
    description: "Ứng dụng công nghệ AI và tự động hóa trong sản xuất sinh học",
    image: "/advanced-technology-lab-equipment.jpg",
  },
  {
    title: "Hợp tác hiệu quả",
    description: "Đối tác tin cậy cho các dự án công nghệ sinh học quy mô lớn",
    image: "/business-partnership-handshake.png",
  },
]

export function SolutionsProjects() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Dự án công nghệ</h2>
        <p className="text-center text-muted-foreground mb-12">
          Chúng tôi cung cấp giải pháp toàn diện cho các dự án công nghệ sinh học
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <Button variant="ghost" size="sm" className="p-0 h-auto group">
                  Xem thêm
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
