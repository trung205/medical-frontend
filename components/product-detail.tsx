"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  Award,
  Phone,
} from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  brand: string;
  model: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  warranty: string;
  shipping: string;
  certification: any;
  summary: string;
}

interface ProductDetailProps {
  product: Product;
}
const LINK_API_URL = process.env.NEXT_PUBLIC_API_URL;

export function ProductDetail({ product }: any) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  console.log("product", product);

  // const discountPercentage = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg border">
            <Image
              src={
                product?.images[selectedImage]
                  ? `${LINK_API_URL}/products/${product?.images[selectedImage].productId}/images/${product?.images[selectedImage].id}`
                  : "/placeholder.svg"
              }
              alt={product?.name || ""}
              width={600}
              height={400}
              className="w-full h-96 object-contain"
            />
            {/* {product.originalPrice && (
              <Badge className="absolute top-4 left-4 bg-red-500">Giảm {discountPercentage}%</Badge>
            )} */}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product?.images?.map((image: any, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative overflow-hidden rounded border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-border"
                }`}
              >
                <Image
                  src={
                    image
                      ? `${LINK_API_URL}/products/${image.productId}/images/${image.id}`
                      : "/placeholder.svg"
                  }
                  alt={`${product.name} ${index + 1}`}
                  width={150}
                  height={100}
                  className="w-full h-20 object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product?.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{product?.name || ""}</h1>
            <p className="text-muted-foreground">
              Thương hiệu:{" "}
              <span className="font-medium">{product?.origin || ""}</span> |
              Model: <span className="font-medium">{product?.sku || ""}</span>
            </p>
          </div>

          <div className="space-y-4">
            <Button variant="secondary" size="lg" className="w-full">
              <Phone className="h-5 w-5 mr-2" />
              Liên hệ tư vấn: 082 881 1300
            </Button>
          </div>
          {product?.summary && (
            <div className="mt-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.summary}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Mô tả</TabsTrigger>
            <TabsTrigger value="specifications">Thông số kỹ thuật</TabsTrigger>
            {/* <TabsTrigger value="warranty">Bảo hành & Vận chuyển</TabsTrigger> */}
            {/* <TabsTrigger value="reviews">Đánh giá</TabsTrigger> */}
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: product?.description || "",
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <CardContent className="pt-6">
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    {product?.specifications &&
                      JSON.parse(product?.specifications).map((item: any) => (
                        <div
                          key={item.key}
                          className="flex justify-between py-2 border-b border-border/50"
                        >
                          <span className="font-medium">{item.key}:</span>
                          <span className="text-muted-foreground">
                            {item.value}
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </CardContent>

          <TabsContent value="warranty" className="mt-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Chính sách bảo hành
                  </h3>
                  {/* <p className="text-muted-foreground">{product.warranty}</p> */}
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Vận chuyển & Lắp đặt
                  </h3>
                  {/* <p className="text-muted-foreground">{product.shipping}</p> */}
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
                  <p className="text-muted-foreground">
                    Tính năng đánh giá sẽ được cập nhật sớm
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
