"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, Award, Phone } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  images: string[]
  brand: string
  model: string
  inStock: boolean
  stockQuantity: number
  rating: number
  reviewCount: number
  description: string
  features: string[]
  specifications: Record<string, string>
  warranty: string
  shipping: string
  certification: string[]
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const discountPercentage = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg border">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-96 object-cover"
            />
            {product.originalPrice && (
              <Badge className="absolute top-4 left-4 bg-red-500">Giảm {discountPercentage}%</Badge>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative overflow-hidden rounded border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-border"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  width={150}
                  height={100}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground">
              Thương hiệu: <span className="font-medium">{product.brand}</span> | Model:{" "}
              <span className="font-medium">{product.model}</span>
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviewCount} đánh giá)</span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">{product.price.toLocaleString("vi-VN")} VNĐ</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString("vi-VN")} VNĐ
                </span>
              )}
            </div>
            {product.originalPrice && (
              <p className="text-sm text-green-600">
                Tiết kiệm: {(product.originalPrice - product.price).toLocaleString("vi-VN")} VNĐ
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
            <span className={product.inStock ? "text-green-600" : "text-red-600"}>
              {product.inStock ? `Còn hàng (${product.stockQuantity} sản phẩm)` : "Hết hàng"}
            </span>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-medium">Số lượng:</label>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-muted"
                  disabled={!product.inStock}
                >
                  -
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  className="px-3 py-2 hover:bg-muted"
                  disabled={!product.inStock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" size="lg" disabled={!product.inStock}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Thêm vào giỏ hàng
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Button variant="secondary" size="lg" className="w-full">
              <Phone className="h-5 w-5 mr-2" />
              Liên hệ tư vấn: 1900-xxxx
            </Button>
          </div>

          {/* Key Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tính năng nổi bật</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {product.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium">Miễn phí vận chuyển</p>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium">Bảo hành chính hãng</p>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium">Chứng nhận quốc tế</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Mô tả</TabsTrigger>
            <TabsTrigger value="specifications">Thông số kỹ thuật</TabsTrigger>
            <TabsTrigger value="warranty">Bảo hành & Vận chuyển</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p className="text-lg mb-6">{product.description}</p>

                  <h3 className="text-xl font-semibold mb-4">Tính năng chi tiết:</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold mb-4 mt-8">Chứng nhận:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.certification.map((cert, index) => (
                      <Badge key={index} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border/50">
                      <span className="font-medium">{key}:</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="warranty" className="mt-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Chính sách bảo hành</h3>
                  <p className="text-muted-foreground">{product.warranty}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Vận chuyển & Lắp đặt</h3>
                  <p className="text-muted-foreground">{product.shipping}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Dịch vụ hỗ trợ</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Tư vấn kỹ thuật 24/7</li>
                    <li>• Đào tạo sử dụng thiết bị</li>
                    <li>• Bảo trì định kỳ</li>
                    <li>• Hỗ trợ từ xa</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Tính năng đánh giá sẽ được cập nhật sớm</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
