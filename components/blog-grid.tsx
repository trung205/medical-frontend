import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "Hướng dẫn chọn mua máy siêu âm phù hợp cho phòng khám",
    excerpt:
      "Tìm hiểu các tiêu chí quan trọng khi lựa chọn máy siêu âm cho phòng khám của bạn, từ công nghệ đến ngân sách đầu tư.",
    category: "Hướng dẫn",
    author: "BS. Nguyễn Văn A",
    date: "15/01/2024",
    image: "/blog-ultrasound-guide.jpg",
    readTime: "5 phút đọc",
  },
  {
    id: 2,
    title: "Công nghệ AI trong chẩn đoán hình ảnh y khoa",
    excerpt:
      "Khám phá cách trí tuệ nhân tạo đang cách mạng hóa lĩnh vực chẩn đoán hình ảnh và nâng cao độ chính xác trong y học.",
    category: "Công nghệ",
    author: "TS. Trần Thị B",
    date: "12/01/2024",
    image: "/blog-ai-medical-imaging.jpg",
    readTime: "7 phút đọc",
  },
  {
    id: 3,
    title: "Bảo trì thiết bị y tế: Quy trình chuẩn và lưu ý quan trọng",
    excerpt: "Hướng dẫn chi tiết về quy trình bảo trì thiết bị y tế để đảm bảo hoạt động ổn định và tuổi thọ lâu dài.",
    category: "Bảo trì",
    author: "KS. Lê Văn C",
    date: "10/01/2024",
    image: "/blog-equipment-maintenance.jpg",
    readTime: "6 phút đọc",
  },
  {
    id: 4,
    title: "Xu hướng thiết bị y tế thông minh năm 2024",
    excerpt: "Điểm qua những xu hướng công nghệ mới nhất trong lĩnh vực thiết bị y tế và IoT trong chăm sóc sức khỏe.",
    category: "Xu hướng",
    author: "BS. Phạm Thị D",
    date: "08/01/2024",
    image: "/blog-smart-medical-devices.jpg",
    readTime: "8 phút đọc",
  },
  {
    id: 5,
    title: "Tiêu chuẩn an toàn thiết bị y tế tại Việt Nam",
    excerpt:
      "Tổng quan về các tiêu chuẩn và quy định pháp lý liên quan đến thiết bị y tế tại Việt Nam mà các cơ sở y tế cần biết.",
    category: "Quy định",
    author: "Luật sư Hoàng Văn E",
    date: "05/01/2024",
    image: "/blog-medical-standards.jpg",
    readTime: "10 phút đọc",
  },
  {
    id: 6,
    title: "Cách tối ưu hóa phòng X-quang hiện đại",
    excerpt:
      "Những giải pháp thiết kế và bố trí phòng X-quang để đạt hiệu quả cao nhất về an toàn và chất lượng hình ảnh.",
    category: "Thiết kế",
    author: "KTS. Vũ Thị F",
    date: "03/01/2024",
    image: "/blog-xray-room-optimization.jpg",
    readTime: "6 phút đọc",
  },
]

export function BlogGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full group">
                  Đọc thêm
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
