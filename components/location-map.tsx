import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Navigation, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LocationMap() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Vị trí văn phòng</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ghé thăm showroom để trải nghiệm trực tiếp các thiết bị y tế hiện đại
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-96 bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Bản đồ tương tác sẽ được tích hợp tại đây</p>
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Xem trên Google Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Trụ sở chính</h3>
                    <p className="text-sm text-muted-foreground">TP. Hồ Chí Minh</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Địa chỉ:</strong> 123 Đường Nguyễn Văn Cừ, Quận 1, TP.HCM
                  </p>
                  <p>
                    <strong>Điện thoại:</strong> (028) 3xxx-xxxx
                  </p>
                  <p>
                    <strong>Email:</strong> hcm@medequip.vn
                  </p>
                  <p>
                    <strong>Giờ mở cửa:</strong>
                  </p>
                  <ul className="ml-4 space-y-1 text-muted-foreground">
                    <li>• Thứ 2 - Thứ 6: 8:00 - 17:30</li>
                    <li>• Thứ 7: 8:00 - 12:00</li>
                    <li>• Chủ nhật: Nghỉ</li>
                  </ul>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1">
                    <Navigation className="h-4 w-4 mr-2" />
                    Chỉ đường
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Street View
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Hướng dẫn đến showroom</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    🚗 <strong>Ô tô:</strong> Có bãi đậu xe miễn phí
                  </p>
                  <p>
                    🚌 <strong>Xe buýt:</strong> Tuyến 01, 05, 19 (Bến xe Bến Thành)
                  </p>
                  <p>
                    🚇 <strong>Metro:</strong> Ga Bến Thành (200m)
                  </p>
                  <p>
                    🏥 <strong>Gần:</strong> Bệnh viện Chợ Rẫy, BV Nhi Đồng 1
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
