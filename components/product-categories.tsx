import { Card, CardContent } from "@/components/ui/card"
import { Stethoscope, Heart, Brain, Eye, Bone, Microscope } from "lucide-react"

const categories = [
  {
    icon: Stethoscope,
    title: "Thiết bị chẩn đoán",
    description: "Máy siêu âm, X-quang, CT Scanner",
    count: "120+ sản phẩm",
  },
  {
    icon: Heart,
    title: "Thiết bị tim mạch",
    description: "Máy điện tim, monitor bệnh nhân",
    count: "85+ sản phẩm",
  },
  {
    icon: Brain,
    title: "Thiết bị thần kinh",
    description: "EEG, EMG, thiết bị phẫu thuật não",
    count: "65+ sản phẩm",
  },
  {
    icon: Eye,
    title: "Thiết bị nhãn khoa",
    description: "Kính hiển vi, máy đo thị lực",
    count: "45+ sản phẩm",
  },
  {
    icon: Bone,
    title: "Thiết bị xương khớp",
    description: "Máy X-quang xương, thiết bị vật lý trị liệu",
    count: "75+ sản phẩm",
  },
  {
    icon: Microscope,
    title: "Thiết bị xét nghiệm",
    description: "Kính hiển vi, máy xét nghiệm máu",
    count: "95+ sản phẩm",
  },
]

export function ProductCategories() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Danh mục sản phẩm</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Khám phá bộ sưu tập thiết bị y tế đa dạng của chúng tôi, được phân loại theo chuyên khoa để dễ dàng tìm
            kiếm.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/20"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
                    <div className="text-xs text-accent font-medium">{category.count}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
