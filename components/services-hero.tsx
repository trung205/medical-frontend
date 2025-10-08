import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wrench, Users, Clock, Award } from "lucide-react"
import Image from "next/image"

export function ServicesHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <Badge className="mb-4">Dịch vụ chuyên nghiệp</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Dịch vụ toàn diện cho thiết bị y tế</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Từ tư vấn, lắp đặt đến bảo trì và đào tạo - chúng tôi đồng hành cùng bạn trong suốt vòng đời của thiết
                bị y tế.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Lắp đặt chuyên nghiệp</p>
                  <p className="text-sm text-muted-foreground">Đội ngũ kỹ sư giàu kinh nghiệm</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Đào tạo sử dụng</p>
                  <p className="text-sm text-muted-foreground">Hướng dẫn chi tiết cho đội ngũ y tế</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Bảo trì định kỳ</p>
                  <p className="text-sm text-muted-foreground">Đảm bảo hoạt động ổn định</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Hỗ trợ 24/7</p>
                  <p className="text-sm text-muted-foreground">Sẵn sàng hỗ trợ mọi lúc</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg">Tư vấn miễn phí</Button>
              <Button variant="outline" size="lg">
                Xem bảng giá
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/modern-medical-equipment-in-hospital-setting.jpg"
                alt="Dịch vụ thiết bị y tế"
                width={600}
                height={400}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-card border rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">&lt; 2 giờ</p>
                  <p className="text-sm text-muted-foreground">Thời gian phản hồi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
