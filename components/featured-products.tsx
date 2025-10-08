import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Máy siêu âm GE Voluson E8",
    price: "850,000,000",
    originalPrice: "950,000,000",
    rating: 4.8,
    reviews: 24,
    image: "/ultrasound-machine-medical-equipment.jpg",
    badge: "Bán chạy",
    features: ["4D imaging", "Chứng nhận CE", "Bảo hành 2 năm"],
  },
  {
    id: 2,
    name: "Máy điện tim Philips PageWriter TC70",
    price: "125,000,000",
    originalPrice: null,
    rating: 4.9,
    reviews: 18,
    image: "/ecg-machine.png",
    badge: "Mới nhất",
    features: ["12 lead ECG", "Màn hình cảm ứng", "Kết nối WiFi"],
  },
  {
    id: 3,
    name: "Monitor bệnh nhân Mindray uMEC15",
    price: "45,000,000",
    originalPrice: "52,000,000",
    rating: 4.7,
    reviews: 31,
    image: "/patient-monitor-medical-equipment.jpg",
    badge: "Giảm giá",
    features: ["Màn hình 15 inch", "Multi-parameter", "Báo động thông minh"],
  },
  {
    id: 4,
    name: "Máy X-quang di động MinXray HF120",
    price: "320,000,000",
    originalPrice: null,
    rating: 4.6,
    reviews: 12,
    image: "/portable-x-ray-machine-medical-equipment.jpg",
    badge: "Chuyên nghiệp",
    features: ["Di động", "Chất lượng cao", "Dễ sử dụng"],
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Sản phẩm nổi bật</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Những thiết bị y tế được tin dùng nhất bởi các bệnh viện và cơ sở y tế hàng đầu Việt Nam.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">{product.badge}</Badge>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">{product.price} VNĐ</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">{product.originalPrice} VNĐ</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="text-xs text-muted-foreground flex items-center">
                        <div className="w-1 h-1 bg-accent rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-4" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Thêm vào giỏ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Xem tất cả sản phẩm
          </Button>
        </div>
      </div>
    </section>
  )
}
