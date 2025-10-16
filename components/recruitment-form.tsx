"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Send } from "lucide-react"

const jobPositions = [
  "Kỹ sư Công nghệ Sinh học",
  "Chuyên viên Nghiên cứu & Phát triển",
  "Kỹ thuật viên Phòng thí nghiệm",
  "Quản lý Dự án",
  "Kỹ sư Quy trình Sản xuất",
  "Chuyên viên Kiểm soát Chất lượng",
  "Nhân viên Kinh doanh",
  "Vị trí khác",
]

export function RecruitmentForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    cvLink: "",
    experience: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit to Google Sheets via Google Apps Script Web App
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyclmv1Tu3RoeGxsgpmnrEiRdRk4dg7RVpetczzMzflKLBfzmVNlOopnCHz4YPzNA8E/exec", // Replace with your Google Apps Script deployment URL
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
          }),
        },
      )

      console.log("[v0] Form submitted to Google Sheets:", formData)
      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          position: "",
          cvLink: "",
          experience: "",
          message: "",
        })
      }, 3000)
    } catch (error) {
      console.error("[v0] Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cảm ơn bạn đã ứng tuyển!</h3>
              <p className="text-muted-foreground mb-4">
                Chúng tôi đã nhận được hồ sơ của bạn và sẽ liên hệ trong thời gian sớm nhất.
              </p>
              <p className="text-sm text-muted-foreground">
                Nếu có thắc mắc, vui lòng liên hệ: <strong>hr@ndbio.vn</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Job Description */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Vị trí tuyển dụng</h2>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Kỹ sư Công nghệ Sinh học</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Mô tả công việc:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Nghiên cứu và phát triển quy trình sản xuất công nghệ sinh học</li>
                    <li>Vận hành và bảo trì thiết bị sản xuất</li>
                    <li>Kiểm soát chất lượng sản phẩm</li>
                    <li>Tối ưu hóa quy trình sản xuất</li>
                    <li>Lập báo cáo kỹ thuật và tài liệu quy trình</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Yêu cầu:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Tốt nghiệp Đại học chuyên ngành Công nghệ Sinh học hoặc liên quan</li>
                    <li>Có kinh nghiệm làm việc trong lĩnh vực công nghệ sinh học</li>
                    <li>Kỹ năng phân tích và giải quyết vấn đề tốt</li>
                    <li>Có khả năng làm việc độc lập và theo nhóm</li>
                    <li>Tiếng Anh giao tiếp tốt là một lợi thế</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Quyền lợi:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Mức lương cạnh tranh, thỏa thuận theo năng lực</li>
                    <li>Thưởng hiệu suất, thưởng lễ tết</li>
                    <li>Bảo hiểm đầy đủ theo quy định</li>
                    <li>Môi trường làm việc chuyên nghiệp, năng động</li>
                    <li>Cơ hội đào tạo và phát triển nghề nghiệp</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
              * Chúng tôi cũng đang tuyển dụng nhiều vị trí khác. Vui lòng chọn vị trí phù hợp trong form ứng tuyển.
            </p>
          </div>

          {/* Application Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Form ứng tuyển</CardTitle>
                <p className="text-muted-foreground">Điền thông tin của bạn để ứng tuyển</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Nguyễn Văn A"
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
                    <Label htmlFor="position">Vị trí ứng tuyển *</Label>
                    <Select onValueChange={(value) => handleInputChange("position", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn vị trí" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobPositions.map((position) => (
                          <SelectItem key={position} value={position}>
                            {position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvLink">Link CV (Google Drive, Dropbox, etc.) *</Label>
                    <Input
                      id="cvLink"
                      type="url"
                      value={formData.cvLink}
                      onChange={(e) => handleInputChange("cvLink", e.target.value)}
                      placeholder="https://drive.google.com/..."
                      required
                    />
                    <p className="text-xs text-muted-foreground">Vui lòng đảm bảo link có thể truy cập công khai</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Số năm kinh nghiệm</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      placeholder="VD: 2 năm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Giới thiệu bản thân</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Chia sẻ về kinh nghiệm, kỹ năng và lý do bạn muốn gia nhập NDBio..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    <Send className="h-5 w-5 mr-2" />
                    {isSubmitting ? "Đang gửi..." : "Gửi hồ sơ ứng tuyển"}
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
          </div>
        </div>
      </div>
    </section>
  )
}
