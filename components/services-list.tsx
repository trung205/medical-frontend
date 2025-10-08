import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, GraduationCap, Wrench, HeadphonesIcon, FileText, Shield, CheckCircle } from "lucide-react"

const services = [
  {
    icon: Settings,
    title: "Lắp đặt & Cài đặt",
    description: "Lắp đặt thiết bị y tế chuyên nghiệp, cài đặt phần mềm và hiệu chuẩn theo tiêu chuẩn quốc tế",
    features: [
      "Khảo sát hiện trường miễn phí",
      "Lắp đặt theo tiêu chuẩn kỹ thuật",
      "Hiệu chuẩn và kiểm tra chất lượng",
      "Bàn giao và hướng dẫn sử dụng",
    ],
    duration: "1-3 ngày",
    warranty: "12 tháng",
    popular: false,
  },
  {
    icon: GraduationCap,
    title: "Đào tạo Sử dụng",
    description: "Chương trình đào tạo toàn diện cho đội ngũ y tế về cách sử dụng và vận hành thiết bị",
    features: [
      "Đào tạo lý thuyết và thực hành",
      "Tài liệu hướng dẫn tiếng Việt",
      "Chứng chỉ hoàn thành khóa học",
      "Hỗ trợ sau đào tạo 6 tháng",
    ],
    duration: "2-5 ngày",
    warranty: "Hỗ trợ 6 tháng",
    popular: true,
  },
  {
    icon: Wrench,
    title: "Bảo trì & Sửa chữa",
    description: "Dịch vụ bảo trì định kỳ và sửa chữa thiết bị để đảm bảo hoạt động ổn định và kéo dài tuổi thọ",
    features: [
      "Bảo trì định kỳ theo lịch",
      "Sửa chữa khẩn cấp 24/7",
      "Thay thế linh kiện chính hãng",
      "Báo cáo tình trạng thiết bị",
    ],
    duration: "Theo lịch",
    warranty: "6 tháng",
    popular: false,
  },
  {
    icon: HeadphonesIcon,
    title: "Hỗ trợ Kỹ thuật",
    description: "Đội ngũ kỹ sư chuyên nghiệp sẵn sàng hỗ trợ từ xa và tại chỗ mọi lúc mọi nơi",
    features: [
      "Hotline 24/7",
      "Hỗ trợ từ xa qua TeamViewer",
      "Tư vấn kỹ thuật chuyên sâu",
      "Cập nhật phần mềm định kỳ",
    ],
    duration: "24/7",
    warranty: "Theo hợp đồng",
    popular: false,
  },
  {
    icon: FileText,
    title: "Tư vấn & Thiết kế",
    description: "Tư vấn giải pháp tổng thể, thiết kế hệ thống và lập kế hoạch triển khai phù hợp",
    features: [
      "Khảo sát nhu cầu chi tiết",
      "Thiết kế giải pháp tối ưu",
      "Lập kế hoạch triển khai",
      "Hỗ trợ xin phép cơ quan chức năng",
    ],
    duration: "1-2 tuần",
    warranty: "Theo dự án",
    popular: false,
  },
  {
    icon: Shield,
    title: "Bảo hành Mở rộng",
    description: "Gói bảo hành mở rộng với nhiều mức độ bảo vệ khác nhau cho thiết bị y tế",
    features: ["Bảo hành 3-5 năm", "Thay thế thiết bị dự phòng", "Ưu tiên hỗ trợ kỹ thuật", "Cập nhật công nghệ mới"],
    duration: "3-5 năm",
    warranty: "Theo gói",
    popular: true,
  },
]

export function ServicesList() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Dịch vụ của chúng tôi</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Giải pháp toàn diện từ tư vấn, lắp đặt đến bảo trì và hỗ trợ kỹ thuật
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-lg transition-shadow ${service.popular ? "border-primary" : ""}`}
            >
              {service.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Phổ biến</Badge>
              )}

              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Thời gian:</span>
                    <span className="font-medium">{service.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bảo hành:</span>
                    <span className="font-medium">{service.warranty}</span>
                  </div>
                </div>

                <Button className="w-full" variant={service.popular ? "default" : "outline"}>
                  Tìm hiểu thêm
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
