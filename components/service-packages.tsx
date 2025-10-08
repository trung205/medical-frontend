import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Crown, Shield } from "lucide-react"

const packages = [
  {
    name: "Gói Cơ bản",
    icon: Shield,
    price: "Từ 5,000,000",
    period: "VNĐ/năm",
    description: "Phù hợp cho phòng khám nhỏ và cơ sở y tế vừa",
    features: [
      "Lắp đặt thiết bị cơ bản",
      "Đào tạo sử dụng 1 ngày",
      "Bảo hành 12 tháng",
      "Hỗ trợ kỹ thuật giờ hành chính",
      "Bảo trì định kỳ 2 lần/năm",
      "Cập nhật phần mềm cơ bản",
    ],
    popular: false,
    color: "border-border",
  },
  {
    name: "Gói Chuyên nghiệp",
    icon: Star,
    price: "Từ 12,000,000",
    period: "VNĐ/năm",
    description: "Lựa chọn tối ưu cho bệnh viện và trung tâm y tế",
    features: [
      "Lắp đặt và cài đặt chuyên nghiệp",
      "Đào tạo chuyên sâu 3 ngày",
      "Bảo hành 24 tháng",
      "Hỗ trợ kỹ thuật 24/7",
      "Bảo trì định kỳ 4 lần/năm",
      "Cập nhật phần mềm đầy đủ",
      "Thiết bị dự phòng khi sửa chữa",
      "Báo cáo tình trạng thiết bị",
    ],
    popular: true,
    color: "border-primary",
  },
  {
    name: "Gói Cao cấp",
    icon: Crown,
    price: "Từ 25,000,000",
    period: "VNĐ/năm",
    description: "Giải pháp toàn diện cho bệnh viện lớn và hệ thống y tế",
    features: [
      "Tư vấn và thiết kế hệ thống",
      "Lắp đặt và tích hợp hoàn chỉnh",
      "Đào tạo toàn diện 5 ngày",
      "Bảo hành 36 tháng",
      "Hỗ trợ kỹ thuật ưu tiên 24/7",
      "Bảo trì định kỳ 6 lần/năm",
      "Cập nhật công nghệ mới nhất",
      "Thiết bị dự phòng cao cấp",
      "Quản lý từ xa và giám sát",
      "Đào tạo nâng cao định kỳ",
      "Tư vấn tối ưu hóa quy trình",
    ],
    popular: false,
    color: "border-yellow-500",
  },
]

export function ServicePackages() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Gói dịch vụ</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lựa chọn gói dịch vụ phù hợp với quy mô và nhu cầu của cơ sở y tế
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-xl transition-all duration-300 ${pkg.color} ${pkg.popular ? "scale-105" : ""}`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">Phổ biến nhất</Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <pkg.icon className={`h-8 w-8 ${pkg.popular ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{pkg.description}</p>
                <div className="pt-4">
                  <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                  <div className="text-sm text-muted-foreground">{pkg.period}</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full" variant={pkg.popular ? "default" : "outline"} size="lg">
                  {pkg.popular ? "Chọn gói này" : "Tìm hiểu thêm"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Giá có thể thay đổi tùy theo thiết bị và yêu cầu cụ thể
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Cần tư vấn gói dịch vụ phù hợp? Liên hệ với chuyên gia của chúng tôi
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Tư vấn miễn phí</Button>
            <Button variant="outline" size="lg">
              So sánh gói dịch vụ
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
