import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"

export function BlogDetail() {
  return (
    <article className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            Hướng dẫn
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Hướng dẫn chọn mua máy siêu âm phù hợp cho phòng khám
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>BS. Nguyễn Văn A</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>15/01/2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>5 phút đọc</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Chia sẻ:</span>
            <Button variant="outline" size="icon">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-12">
          <Image
            src="/blog-ultrasound-guide-detail.jpg"
            alt="Hướng dẫn chọn mua máy siêu âm"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Việc lựa chọn máy siêu âm phù hợp cho phòng khám là một quyết định quan trọng, ảnh hưởng trực tiếp đến chất
            lượng chẩn đoán và hiệu quả hoạt động của cơ sở y tế. Bài viết này sẽ hướng dẫn bạn các tiêu chí cần xem xét
            khi đầu tư vào thiết bị siêu âm.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Xác định nhu cầu sử dụng</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Trước khi quyết định mua máy siêu âm, bạn cần xác định rõ mục đích sử dụng chính. Máy siêu âm có nhiều loại
            khác nhau phục vụ cho các chuyên khoa như sản phụ khoa, tim mạch, tiêu hóa, cơ xương khớp... Việc xác định
            đúng nhu cầu sẽ giúp bạn chọn được thiết bị phù hợp nhất.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Công nghệ và chất lượng hình ảnh</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Chất lượng hình ảnh là yếu tố quan trọng nhất của máy siêu âm. Các công nghệ hiện đại như 3D/4D, Doppler
            màu, và các tính năng xử lý hình ảnh tiên tiến sẽ giúp nâng cao độ chính xác trong chẩn đoán. Tuy nhiên,
            công nghệ càng cao thì giá thành càng đắt, do đó cần cân nhắc giữa nhu cầu thực tế và ngân sách.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Đầu dò (Probe) và tính linh hoạt</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Số lượng và loại đầu dò đi kèm là yếu tố quan trọng. Mỗi loại đầu dò phục vụ cho một mục đích khám khác
            nhau. Một máy siêu âm tốt nên có khả năng tương thích với nhiều loại đầu dò để đáp ứng đa dạng nhu cầu khám
            bệnh.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Tính di động và thiết kế</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Tùy vào không gian và cách thức sử dụng, bạn có thể chọn máy siêu âm cố định hoặc di động. Máy di động phù
            hợp cho các phòng khám nhỏ hoặc cần di chuyển giữa các phòng, trong khi máy cố định thường có cấu hình mạnh
            hơn và phù hợp cho các bệnh viện lớn.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Dịch vụ hậu mãi và bảo hành</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Dịch vụ bảo hành, bảo trì và hỗ trợ kỹ thuật là yếu tố không thể bỏ qua. Hãy chọn nhà cung cấp uy tín với
            chính sách bảo hành rõ ràng, đội ngũ kỹ thuật chuyên nghiệp và khả năng cung cấp phụ tùng thay thế nhanh
            chóng.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Ngân sách và tổng chi phí sở hữu</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ngoài giá mua ban đầu, bạn cần tính đến các chi phí vận hành như điện năng, bảo trì định kỳ, thay thế phụ
            tùng và đào tạo nhân viên. Một máy có giá thấp nhưng chi phí vận hành cao có thể không phải là lựa chọn tối
            ưu về lâu dài.
          </p>

          <div className="bg-accent/20 border-l-4 border-accent p-6 rounded-r-lg mt-8">
            <h3 className="text-xl font-semibold text-foreground mb-3">Kết luận</h3>
            <p className="text-muted-foreground leading-relaxed">
              Việc chọn mua máy siêu âm cần được cân nhắc kỹ lưỡng dựa trên nhiều yếu tố. Hãy tham khảo ý kiến từ các
              chuyên gia, so sánh nhiều sản phẩm và nhà cung cấp khác nhau trước khi đưa ra quyết định cuối cùng. Đội
              ngũ MedEquip Pro luôn sẵn sàng tư vấn và hỗ trợ bạn tìm được giải pháp phù hợp nhất.
            </p>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-secondary rounded-lg">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xl">
              NA
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">BS. Nguyễn Văn A</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Bác sĩ chuyên khoa Chẩn đoán hình ảnh với hơn 15 năm kinh nghiệm trong lĩnh vực siêu âm y khoa. Hiện
                đang là chuyên gia tư vấn tại MedEquip Pro và giảng viên tại Đại học Y Hà Nội.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
