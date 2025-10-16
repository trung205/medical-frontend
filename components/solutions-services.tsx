import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const services = [
  {
    title: "Dây chuyền sản xuất",
    description:
      "Chúng tôi phân phối thiết bị và vật tư chất lượng cao cho ngành công nghiệp công nghệ sinh học đảm bảo phù hợp nhất với nhu cầu khách hàng.",
    image: "/industrial-production-line-bioreactor.avif",
  },
  {
    title: "Quy trình sản xuất",
    description:
      "Cung cấp giải pháp toàn diện cho đối tác trong quy trình sản xuất công nghệ sinh học từ nguyên vật liệu tới tư vấn quy trình sản xuất hoàn thiện.",
    image: "/laboratory-glassware-yellow-liquid.avif",
  },
  {
    title: "Hỗ trợ kỹ thuật",
    description:
      "Chúng tôi hỗ trợ từ các kĩ thuật công nghệ sinh học tới lắp đặt bảo trì và vận hành máy móc, đảm bảo hiệu quả trong quá trình sản xuất.",
    image: "/engineer-with-hard-hat-and-wrench-3d.avif",
  },
]

export function SolutionsServices() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow !pt-0 gap-0">
              <div className="relative h-48 w-full">
                <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
