import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Shield, CheckCircle, Globe } from "lucide-react"

const certifications = [
  // {
  //   icon: Award,
  //   name: "ISO 13485:2016",
  //   description: "Hệ thống quản lý chất lượng thiết bị y tế",
  //   issuer: "TÜV SÜD",
  //   year: "2024",
  // },
  // {
  //   icon: Shield,
  //   name: "CE Marking",
  //   description: "Chứng nhận tuân thủ tiêu chuẩn Châu Âu",
  //   issuer: "EU Notified Body",
  //   year: "2024",
  // },
  // {
  //   icon: CheckCircle,
  //   name: "FDA Registration",
  //   description: "Đăng ký với Cục Quản lý Thực phẩm và Dược phẩm Mỹ",
  //   issuer: "US FDA",
  //   year: "2023",
  // },
  {
    icon: Globe,
    name: "ISO 9001:2015",
    description: "Hệ thống quản lý chất lượng quốc tế",
    issuer: "SGS Vietnam",
    year: "2024",
  },
]

const partnerships = [
  {
    name: "INNOVA",
    role: "Nhà phân phối độc quyền",
    region: "Trung Quốc",
  },
  {
    name: "ACME",
    role: "Đối tác phân phối",
    region: "Trung Quốc",
  },
 
]

export function CertificationsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Chứng nhận & Đối tác</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Được công nhận bởi các tổ chức uy tín và hợp tác với những thương hiệu hàng đầu thế giới
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center lg:text-left">Chứng nhận chất lượng</h3>
            <div className="grid gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <cert.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{cert.name}</h4>
                          <Badge variant="outline">{cert.year}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{cert.description}</p>
                        <p className="text-xs text-muted-foreground">Cấp bởi: {cert.issuer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Partnerships */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center lg:text-left">Đối tác chiến lược</h3>
            <div className="grid gap-6">
              {partnerships.map((partner, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{partner.name}</h4>
                        <p className="text-sm text-muted-foreground">{partner.role}</p>
                      </div>
                      <Badge variant="secondary">{partner.region}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <h4 className="font-semibold mb-2">Mở rộng hợp tác</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Chúng tôi luôn tìm kiếm các đối tác mới để mang đến những giải pháp y tế tốt nhất
                </p>
                <Badge className="bg-primary">Liên hệ hợp tác</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
