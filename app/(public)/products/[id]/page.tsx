import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import { RelatedProducts } from "@/components/related-products"
import { notFound } from "next/navigation"

// Mock data - in real app this would come from database
const products = [
  {
    id: 1,
    name: "Máy Siêu Âm Philips EPIQ Elite",
    category: "Thiết bị chẩn đoán hình ảnh",
    price: 2500000000,
    originalPrice: 2800000000,
    images: [
      "/ultrasound-machine-medical-equipment.jpg",
      "/modern-medical-equipment-in-hospital-setting.jpg",
      "/ultrasound-machine-detail-view.jpg",
      "/ultrasound-machine-control-panel.jpg",
    ],
    brand: "Philips Healthcare",
    model: "EPIQ Elite",
    inStock: true,
    stockQuantity: 5,
    rating: 4.8,
    reviewCount: 24,
    description:
      "Máy siêu âm EPIQ Elite của Philips là giải pháp chẩn đoán hình ảnh tiên tiến nhất, được thiết kế để cung cấp chất lượng hình ảnh vượt trội và hiệu suất làm việc tối ưu cho các chuyên gia y tế.",
    features: [
      "Công nghệ 4D Imaging với độ phân giải cao",
      "AI-powered diagnostics tự động phân tích",
      "Thiết kế di động với màn hình cảm ứng 21.5 inch",
      "Kết nối không dây và lưu trữ đám mây",
      "Chế độ quét đa tần số thích ứng",
      "Giao diện người dùng trực quan",
    ],
    specifications: {
      "Màn hình": "21.5 inch LED cảm ứng",
      "Độ phân giải": "1920 x 1080 Full HD",
      "Tần số": "1-15 MHz",
      "Chế độ quét": "2D, 3D, 4D, Doppler",
      "Kết nối": "WiFi, Ethernet, USB 3.0",
      "Nguồn điện": "AC 100-240V, 50/60Hz",
      "Trọng lượng": "85 kg",
      "Kích thước": "1350 x 650 x 1200 mm",
      "Chứng nhận": "CE, FDA, ISO 13485",
      "Bảo hành": "2 năm toàn diện",
    },
    warranty: "2 năm bảo hành toàn diện + 1 năm bảo trì miễn phí",
    shipping: "Miễn phí vận chuyển và lắp đặt tại Việt Nam",
    certification: ["CE Mark", "FDA Approved", "ISO 13485", "IEC 60601-1"],
  },
]

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === Number.parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ProductDetail product={product} />
      <RelatedProducts currentProductId={product.id} />
      <Footer />
    </main>
  )
}
