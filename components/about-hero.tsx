import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Users, Globe, Heart } from "lucide-react"
import Image from "next/image"

export function AboutHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <Badge className="mb-4">Về chúng tôi</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
                Đối tác tin cậy trong lĩnh vực thiết bị y tế
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Với hơn 15 năm kinh nghiệm, chúng tôi tự hào là nhà cung cấp thiết bị y tế hàng đầu Việt Nam, phục vụ
                hơn 500 bệnh viện và cơ sở y tế trên toàn quốc.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">15+ năm</p>
                  <p className="text-sm text-muted-foreground">Kinh nghiệm</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">500+</p>
                  <p className="text-sm text-muted-foreground">Khách hàng</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">63 tỉnh</p>
                  <p className="text-sm text-muted-foreground">Phủ sóng</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">1M+</p>
                  <p className="text-sm text-muted-foreground">Bệnh nhân được phục vụ</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg">Liên hệ ngay</Button>
              <Button variant="outline" size="lg">
                Tải catalog
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/modern-medical-equipment-in-hospital-setting.jpg"
                alt="Thiết bị y tế hiện đại"
                width={600}
                height={400}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">ISO 13485</p>
                  <p className="text-sm text-muted-foreground">Chứng nhận chất lượng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
