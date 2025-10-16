import { Card, CardContent } from "@/components/ui/card"
import { Heart, GraduationCap, Coffee, Plane, Gift, Users } from "lucide-react"

const benefits = [
  {
    icon: Heart,
    title: "Bảo hiểm sức khỏe",
    description: "Bảo hiểm y tế toàn diện cho nhân viên và gia đình",
  },
  {
    icon: GraduationCap,
    title: "Đào tạo & Phát triển",
    description: "Chương trình đào tạo chuyên sâu và cơ hội học tập liên tục",
  },
  {
    icon: Coffee,
    title: "Môi trường làm việc",
    description: "Văn phòng hiện đại, không gian làm việc thoải mái",
  },
  {
    icon: Plane,
    title: "Du lịch hàng năm",
    description: "Chuyến du lịch team building và nghỉ dưỡng",
  },
  {
    icon: Gift,
    title: "Thưởng & Phúc lợi",
    description: "Thưởng hiệu suất, thưởng lễ tết và các phúc lợi khác",
  },
  {
    icon: Users,
    title: "Văn hóa doanh nghiệp",
    description: "Môi trường làm việc thân thiện, đồng đội hỗ trợ lẫn nhau",
  },
]

export function RecruitmentBenefits() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Phúc lợi & Quyền lợi</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến môi trường làm việc tốt nhất cho nhân viên
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
