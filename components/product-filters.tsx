"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000000000])

  const categories = [
    "Thiết bị chẩn đoán hình ảnh",
    "Thiết bị theo dõi bệnh nhân",
    "Thiết bị phẫu thuật",
    "Thiết bị cấp cứu",
    "Thiết bị phòng thí nghiệm",
    "Thiết bị vật lý trị liệu",
  ]

  const brands = ["Philips Healthcare", "GE Healthcare", "Siemens Healthineers", "Mindray", "Nihon Kohden", "Medtronic"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Danh Mục</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <Label htmlFor={category} className="text-sm font-normal">
                {category}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thương Hiệu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox id={brand} />
              <Label htmlFor={brand} className="text-sm font-normal">
                {brand}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Khoảng Giá</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000000000}
              step={1000000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{priceRange[0].toLocaleString("vi-VN")} VNĐ</span>
              <span>{priceRange[1].toLocaleString("vi-VN")} VNĐ</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
