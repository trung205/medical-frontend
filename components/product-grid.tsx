import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { getImageProduct } from "@/utils/images"

const products = [
  {
    id: 1,
    name: "Máy Siêu Âm Philips EPIQ Elite",
    category: "Thiết bị chẩn đoán hình ảnh",
    price: 2500000000,
    originalPrice: 2800000000,
    image: "/ultrasound-machine-medical-equipment.jpg",
    brand: "Philips Healthcare",
    inStock: true,
    features: ["4D Imaging", "AI-powered diagnostics", "Portable design"],
  },
  {
    id: 2,
    name: "Monitor Theo Dõi Bệnh Nhân GE B650",
    category: "Thiết bị theo dõi bệnh nhân",
    price: 180000000,
    originalPrice: 200000000,
    image: "/modern-medical-equipment-in-hospital-setting.jpg",
    brand: "GE Healthcare",
    inStock: true,
    features: ["Multi-parameter monitoring", "Wireless connectivity", "Touch screen"],
  },
  {
    id: 3,
    name: "Máy X-quang Kỹ Thuật Số Siemens",
    category: "Thiết bị chẩn đoán hình ảnh",
    price: 1800000000,
    originalPrice: null,
    image: "/digital-x-ray-machine-medical-equipment.jpg",
    brand: "Siemens Healthineers",
    inStock: true,
    features: ["Digital imaging", "Low radiation dose", "Fast processing"],
  },
  {
    id: 4,
    name: "Máy Thở ICU Mindray SV800",
    category: "Thiết bị cấp cứu",
    price: 450000000,
    originalPrice: 500000000,
    image: "/icu-ventilator-medical-equipment.jpg",
    brand: "Mindray",
    inStock: false,
    features: ["Advanced ventilation modes", "Integrated monitoring", "User-friendly interface"],
  },
  {
    id: 5,
    name: "Máy Điện Tim 12 Kênh Nihon Kohden",
    category: "Thiết bị chẩn đoán",
    price: 85000000,
    originalPrice: null,
    image: "/ecg-machine-12-lead-medical-equipment.jpg",
    brand: "Nihon Kohden",
    inStock: true,
    features: ["12-lead ECG", "Automatic interpretation", "Compact design"],
  },
  {
    id: 6,
    name: "Máy Phẫu Thuật Nội Soi Olympus",
    category: "Thiết bị phẫu thuật",
    price: 3200000000,
    originalPrice: null,
    image: "/endoscopy-surgical-equipment-medical.jpg",
    brand: "Olympus",
    inStock: true,
    features: ["4K Ultra HD imaging", "Advanced light source", "Ergonomic design"],
  },
]

export function ProductGrid({ products, handleShowProductDetail }: any) {
  // const ro

  // const handleShowProductDetail = (product: any) => {
  //   toast({
  //     title: product?.name || "",
  //     description: "Bạn đã chọn sản phẩm này",
  //   })
  // }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Hiển thị {products?.length || 0} sản phẩm</p>
        {/* <select className="border rounded-md px-3 py-2 text-sm">
          <option>Sắp xếp theo giá: Thấp đến cao</option>
          <option>Sắp xếp theo giá: Cao đến thấp</option>
          <option>Sắp xếp theo tên A-Z</option>
          <option>Sản phẩm mới nhất</option>
        </select> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products?.length > 0 && products?.map((product: any) => (
          <Card key={product?.id} className="group hover:shadow-lg transition-shadow cursor-pointer pt-0" onClick={() => handleShowProductDetail(product)}>
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={ getImageProduct(product?.images?.[0]) || "/placeholder.svg"}
                  alt={product?.name || ""}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* {product.originalPrice && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    Giảm {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                )} */}
                {/* {!product.inStock && (
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    Hết hàng
                  </Badge>
                )} */}
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  {product?.category || ""}
                </Badge>
                <h3 className="font-semibold text-lg line-clamp-2">{product?.name || ""}</h3>
                <p className="text-sm text-muted-foreground">{product?.origin || ""}</p>
                {/* <div className="space-y-1">
                  {product?.features?.slice(0, 2)?.map((feature: string, index: number) => (
                    <p key={index} className="text-xs text-muted-foreground">
                      • {feature}
                    </p>
                  ))}
                </div> */}
              </div>
            </CardContent>

            {/* <CardFooter className="p-4 pt-0">
              <div className="w-full space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">{product.price.toLocaleString("vi-VN")} VNĐ</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.originalPrice.toLocaleString("vi-VN")} VNĐ
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/products/${product.id}`}>Xem Chi Tiết</Link>
                  </Button>
                  <Button variant="outline" disabled={!product.inStock} className="flex-1 bg-transparent">
                    {product.inStock ? "Thêm Vào Giỏ" : "Hết Hàng"}
                  </Button>
                </div>
              </div>
            </CardFooter> */}
          </Card>
        ))}
      </div>
    </div>
  )
}
