"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Send, CheckCircle } from "lucide-react"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    subject: "",
    message: "",
    newsletter: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        subject: "",
        message: "",
        newsletter: false,
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card className="h-fit">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Cảm ơn bạn đã liên hệ!</h3>
          <p className="text-muted-foreground mb-4">
            Chúng tôi đã nhận được thông tin và sẽ phản hồi trong vòng 24 giờ.
          </p>
          <p className="text-sm text-muted-foreground">
            Để được hỗ trợ nhanh hơn, vui lòng gọi hotline: <strong>1900-xxxx</strong>
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-2xl">Gửi yêu cầu tư vấn</CardTitle>
        <p className="text-muted-foreground">Điền thông tin bên dưới và chúng tôi sẽ liên hệ với bạn sớm nhất</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Nhập họ và tên"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="0xxx-xxx-xxx"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Tên công ty/Bệnh viện</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Tên cơ sở y tế"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">Chức vụ</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                placeholder="Bác sĩ, Kỹ thuật viên, Quản lý..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Chủ đề quan tâm</Label>
              <Select onValueChange={(value) => handleInputChange("subject", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn chủ đề" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Tư vấn thiết bị</SelectItem>
                  <SelectItem value="quotation">Báo giá sản phẩm</SelectItem>
                  <SelectItem value="maintenance">Bảo trì & Sửa chữa</SelectItem>
                  <SelectItem value="training">Đào tạo sử dụng</SelectItem>
                  <SelectItem value="partnership">Hợp tác kinh doanh</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Nội dung chi tiết *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Mô tả chi tiết nhu cầu của bạn: loại thiết bị, ngân sách, thời gian triển khai..."
              rows={5}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
            />
            <Label htmlFor="newsletter" className="text-sm">
              Tôi muốn nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
            </Label>
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Send className="h-5 w-5 mr-2" />
            Gửi yêu cầu
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Bằng cách gửi form này, bạn đồng ý với{" "}
            <a href="#" className="text-primary hover:underline">
              Chính sách bảo mật
            </a>{" "}
            của chúng tôi.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
