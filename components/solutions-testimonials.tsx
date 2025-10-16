import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Nguyễn Thúy Trang",
    position: "Giá Nông",
    content:
      "Dịch vụ tư vấn và lắp đặt dây chuyền sản xuất rất chuyên nghiệp. Đội ngũ kỹ thuật nhiệt tình và có kinh nghiệm, giúp chúng tôi tối ưu hóa quy trình sản xuất.",
    rating: 5,
    avatar: "/woman-portrait.png",
  },
  {
    name: "Hoàng Việt Thương",
    position: "Hưu Nội",
    content:
      "Chúng tôi rất hài lòng với chất lượng thiết bị và dịch vụ hỗ trợ kỹ thuật. Các giải pháp công nghệ sinh học đã giúp nâng cao năng suất và chất lượng sản phẩm của chúng tôi.",
    rating: 5,
    avatar: "/thoughtful-man-portrait.png",
  },
]

export function SolutionsTestimonials() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Đánh giá</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Khách hàng tin tưởng và đánh giá cao dịch vụ của chúng tôi
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-cyan-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
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
