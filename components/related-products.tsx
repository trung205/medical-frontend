import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const relatedProducts = [
  {
    id: 2,
    name: "Monitor Theo Dõi Bệnh Nhân GE B650",
    category: "Thiết bị theo dõi bệnh nhân",
    price: 180000000,
    originalPrice: 200000000,
    image: "/modern-medical-equipment-in-hospital-setting.jpg",
    brand: "GE Healthcare",
    rating: 4.7,
    reviews: 18,
  },
  {
    id: 3,
    name: "Máy X-quang Kỹ Thuật Số Siemens",
    category: "Thiết bị chẩn đoán hình ảnh",
    price: 1800000000,
    image: "/digital-x-ray-machine-medical-equipment.jpg",
    brand: "Siemens Healthineers",
    rating: 4.8,
    reviews: 12,
  },
  {
    id: 4,
    name: "Máy Thở ICU Mindray SV800",
    category: "Thiết bị cấp cứu",
    price: 450000000,
    originalPrice: 500000000,
    image: "/icu-ventilator-medical-equipment.jpg",
    brand: "Mindray",
    rating: 4.6,
    reviews: 24,
  },
  {
    id: 5,
    name: "Máy Điện Tim 12 Kênh Nihon Kohden",
    category: "Thiết bị chẩn đoán",
    price: 85000000,
    image: "/ecg-machine-12-lead-medical-equipment.jpg",
    brand: "Nihon Kohden",
    rating: 4.9,
    reviews: 31,
  },
]

interface RelatedProductsProps {
  currentProductId: number
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const filteredProducts = relatedProducts.filter((product) => product.id !== currentProductId)

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Sản phẩm liên quan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Khám phá thêm các thiết bị y tế chất lượng cao khác</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      Giảm {Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>

                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-muted-foreground">{product.brand}</p>

                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        {product.price.toLocaleString("vi-VN")} VNĐ
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice.toLocaleString("vi-VN")} VNĐ
                        </span>
                      )}
                    </div>

                    <Button asChild size="sm" className="w-full">
                      <Link href={`/san-pham/${product.id}`}>Xem Chi Tiết</Link>
                    </Button>
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
