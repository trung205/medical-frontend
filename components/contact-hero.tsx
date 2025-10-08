import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function ContactHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-4">Liên hệ với chúng tôi</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Sẵn sàng hỗ trợ bạn 24/7</h1>
          <p className="text-lg text-muted-foreground mb-12 text-pretty">
            Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng tư vấn và hỗ trợ bạn tìm ra giải pháp thiết bị y tế phù hợp
            nhất.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Hotline</h3>
              <p className="text-sm text-muted-foreground text-center">
                1900-xxxx
                <br />
                (028) 3xxx-xxxx
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground text-center">
                info@medequip.vn
                <br />
                sales@medequip.vn
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Địa chỉ</h3>
              <p className="text-sm text-muted-foreground text-center">
                123 Đường ABC
                <br />
                Quận 1, TP.HCM
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Giờ làm việc</h3>
              <p className="text-sm text-muted-foreground text-center">
                T2-T6: 8:00-17:30
                <br />
                T7: 8:00-12:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
