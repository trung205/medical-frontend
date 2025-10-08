import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Users, Headphones, MessageCircle, ExternalLink } from "lucide-react"

const offices = [
  {
    name: "Trụ sở chính - TP.HCM",
    address: "123 Đường Nguyễn Văn Cừ, Quận 1, TP.HCM",
    phone: "(028) 3xxx-xxxx",
    email: "hcm@medequip.vn",
    hours: "T2-T6: 8:00-17:30, T7: 8:00-12:00",
    isPrimary: true,
  },
  {
    name: "Chi nhánh Hà Nội",
    address: "456 Đường Láng, Đống Đa, Hà Nội",
    phone: "(024) 3xxx-xxxx",
    email: "hn@medequip.vn",
    hours: "T2-T6: 8:00-17:30, T7: 8:00-12:00",
    isPrimary: false,
  },
  {
    name: "Chi nhánh Đà Nẵng",
    address: "789 Đường Hùng Vương, Hải Châu, Đà Nẵng",
    phone: "(0236) 3xxx-xxxx",
    email: "dn@medequip.vn",
    hours: "T2-T6: 8:00-17:30, T7: 8:00-12:00",
    isPrimary: false,
  },
]

const supportChannels = [
  {
    icon: Phone,
    title: "Hotline 24/7",
    description: "1900-xxxx",
    subtitle: "Hỗ trợ khẩn cấp",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Trò chuyện trực tuyến",
    subtitle: "8:00 - 22:00 hàng ngày",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "support@medequip.vn",
    subtitle: "Phản hồi trong 2 giờ",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: Headphones,
    title: "Tư vấn kỹ thuật",
    description: "tech@medequip.vn",
    subtitle: "Chuyên gia kỹ thuật",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Office Locations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Văn phòng & Showroom
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {offices.map((office, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold">{office.name}</h3>
                {office.isPrimary && <Badge variant="default">Trụ sở chính</Badge>}
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{office.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>{office.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>{office.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span>{office.hours}</span>
                </div>
              </div>

              {index < offices.length - 1 && <div className="border-b border-border/50 pt-3"></div>}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Support Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            Kênh hỗ trợ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {supportChannels.map((channel, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg border hover:shadow-sm transition-shadow"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${channel.bgColor}`}>
                  <channel.icon className={`h-5 w-5 ${channel.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{channel.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{channel.description}</p>
                  <p className="text-xs text-muted-foreground">{channel.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hành động nhanh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start bg-transparent" variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Gọi ngay: 1900-xxxx
          </Button>
          <Button className="w-full justify-start bg-transparent" variant="outline">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat với chuyên viên
          </Button>
          <Button className="w-full justify-start bg-transparent" variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Đặt lịch tư vấn
          </Button>
          <Button className="w-full justify-start bg-transparent" variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Yêu cầu demo sản phẩm
          </Button>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Phone className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-semibold text-red-900">Hỗ trợ khẩn cấp</h4>
              <p className="text-sm text-red-700 mb-2">Dành cho sự cố thiết bị y tế cần xử lý ngay lập tức</p>
              <p className="font-semibold text-red-900">Hotline: 1900-xxxx</p>
              <p className="text-xs text-red-600">Hoạt động 24/7</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
