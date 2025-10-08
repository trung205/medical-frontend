import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "BS. Nguyễn Văn Hùng",
    position: "Giám đốc Bệnh viện Đa khoa Tâm Anh",
    company: "Bệnh viện Tâm Anh",
    content:
      "Dịch vụ lắp đặt và đào tạo của MedEquip rất chuyên nghiệp. Đội ngũ kỹ thuật có kinh nghiệm, hỗ trợ tận tình và luôn sẵn sàng giải đáp mọi thắc mắc.",
    rating: 5,
    image: "/placeholder.svg?key=doctor1",
    service: "Lắp đặt & Đào tạo",
  },
  {
    name: "KTV. Trần Thị Mai",
    position: "Trưởng khoa Chẩn đoán hình ảnh",
    company: "Bệnh viện Chợ Rẫy",
    content:
      "Gói bảo trì của MedEquip giúp thiết bị của chúng tôi luôn hoạt động ổn định. Thời gian phản hồi nhanh, kỹ thuật viên am hiểu sâu về sản phẩm.",
    rating: 5,
    image: "/placeholder.svg?key=doctor2",
    service: "Bảo trì & Sửa chữa",
  },
  {
    name: "BS. Lê Hoàng Nam",
    position: "Phó Giám đốc",
    company: "Trung tâm Y tế Quận 1",
    content:
      "Dịch vụ hỗ trợ 24/7 của MedEquip rất đáng tin cậy. Nhiều lần gặp sự cố khẩn cấp, họ đều có mặt trong thời gian ngắn nhất để xử lý.",
    rating: 5,
    image: "/placeholder.svg?key=doctor3",
    service: "Hỗ trợ Kỹ thuật",
  },
]

export function ServiceTestimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Khách hàng nói gì về dịch vụ</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Những phản hồi tích cực từ các bệnh viện và cơ sở y tế đã sử dụng dịch vụ của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-12 h-12 overflow-hidden rounded-full flex-shrink-0">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {testimonial.service}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="h-8 w-8 text-muted-foreground/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground italic pl-6">"{testimonial.content}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <p className="text-sm text-muted-foreground">Khách hàng hài lòng</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">&lt;2h</div>
              <p className="text-sm text-muted-foreground">Thời gian phản hồi</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-sm text-muted-foreground">Dự án hoàn thành</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
