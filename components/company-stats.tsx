import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Shield, Clock, Star } from "lucide-react"

const stats = [
  // {
  //   icon: TrendingUp,
  //   value: "98%",
  //   label: "Tỷ lệ hài lòng khách hàng",
  //   description: "Dựa trên khảo sát 2024",
  // },
  {
    icon: Shield,
    value: "24/7",
    label: "Hỗ trợ kỹ thuật",
    description: "Đội ngũ kỹ sư chuyên nghiệp",
  },
  {
    icon: Clock,
    value: "< 4h",
    label: "Thời gian phản hồi",
    description: "Cam kết hỗ trợ nhanh chóng",
  },
  {
    icon: Star,
    value: "100%",
    label: "Thiết bị chính hãng",
    description: "Đảm bảo chất lượng tuyệt đối",
  },
]

export function CompanyStats() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Tại sao chọn chúng tôi?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Những con số ấn tượng thể hiện cam kết của chúng tôi với chất lượng dịch vụ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <h3 className="font-semibold mb-2">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
