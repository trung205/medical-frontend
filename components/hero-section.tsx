import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Truck, Award } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Thiết bị y tế <span className="text-primary">chuyên nghiệp</span> cho mọi cơ sở y tế
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-xl">
                Cung cấp các thiết bị y tế chất lượng cao, được chứng nhận quốc tế, phục vụ nhu cầu của bệnh viện, phòng
                khám và các cơ sở y tế.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                Xem sản phẩm
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Tư vấn miễn phí
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <Shield className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-sm font-medium">Chứng nhận CE</div>
                <div className="text-xs text-muted-foreground">Tiêu chuẩn Châu Âu</div>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-sm font-medium">Giao hàng nhanh</div>
                <div className="text-xs text-muted-foreground">Toàn quốc 24h</div>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-sm font-medium">Bảo hành 2 năm</div>
                <div className="text-xs text-muted-foreground">Hỗ trợ kỹ thuật</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 flex items-center justify-center">
              <img
                src="/modern-medical-equipment-in-hospital-setting.jpg"
                alt="Thiết bị y tế hiện đại"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Sản phẩm</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-card border border-border rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-accent">24/7</div>
              <div className="text-sm text-muted-foreground">Hỗ trợ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
