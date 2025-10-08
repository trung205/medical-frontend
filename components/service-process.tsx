import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, FileText, Wrench, CheckCircle, Users } from "lucide-react"

const processSteps = [
  {
    step: 1,
    icon: Phone,
    title: "Liên hệ & Tư vấn",
    description: "Khách hàng liên hệ, chúng tôi tư vấn giải pháp phù hợp",
    details: ["Tiếp nhận yêu cầu 24/7", "Tư vấn miễn phí qua điện thoại", "Đánh giá nhu cầu sơ bộ"],
    duration: "30 phút",
  },
  {
    step: 2,
    icon: FileText,
    title: "Khảo sát & Báo giá",
    description: "Khảo sát hiện trường và lập báo giá chi tiết",
    details: ["Khảo sát tại chỗ miễn phí", "Đo đạc và đánh giá kỹ thuật", "Lập báo giá chi tiết"],
    duration: "1-2 ngày",
  },
  {
    step: 3,
    icon: Wrench,
    title: "Triển khai Dịch vụ",
    description: "Thực hiện lắp đặt, đào tạo hoặc bảo trì theo kế hoạch",
    details: ["Triển khai theo tiêu chuẩn", "Giám sát chất lượng nghiêm ngặt", "Báo cáo tiến độ định kỳ"],
    duration: "1-5 ngày",
  },
  {
    step: 4,
    icon: Users,
    title: "Đào tạo & Bàn giao",
    description: "Đào tạo sử dụng và bàn giao thiết bị cho khách hàng",
    details: ["Đào tạo đội ngũ y tế", "Cung cấp tài liệu hướng dẫn", "Bàn giao chính thức"],
    duration: "1-2 ngày",
  },
  {
    step: 5,
    icon: CheckCircle,
    title: "Hỗ trợ & Bảo hành",
    description: "Hỗ trợ kỹ thuật và bảo hành trong thời gian cam kết",
    details: ["Hỗ trợ kỹ thuật 24/7", "Bảo trì định kỳ", "Cập nhật phần mềm"],
    duration: "Dài hạn",
  },
]

export function ServiceProcess() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Quy trình dịch vụ</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quy trình chuẩn hóa đảm bảo chất lượng dịch vụ tốt nhất cho khách hàng
          </p>
        </div>

        <div className="relative">
          {/* Process line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    {/* Step number */}
                    <div className="relative mb-4">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                        <step.icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <Badge className="absolute -top-2 -right-2 w-8 h-8 rounded-full p-0 flex items-center justify-center">
                        {step.step}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

                    <div className="space-y-2 mb-4">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start gap-2 text-xs">
                          <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground text-left">{detail}</span>
                        </div>
                      ))}
                    </div>

                    <Badge variant="outline" className="text-xs">
                      {step.duration}
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Mọi bước trong quy trình đều được giám sát chất lượng nghiêm ngặt
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              ISO 13485 Certified
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              100% Quality Assured
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
