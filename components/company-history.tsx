import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const milestones = [
  {
    year: "2009",
    title: "Thành lập công ty",
    description: "Bắt đầu với 5 nhân viên và tầm nhìn trở thành nhà cung cấp thiết bị y tế hàng đầu",
    highlight: "Khởi đầu",
  },
  {
    year: "2012",
    title: "Mở rộng thị trường",
    description: "Ký kết hợp tác với 50 bệnh viện đầu tiên và mở chi nhánh tại TP.HCM",
    highlight: "Phát triển",
  },
  {
    year: "2016",
    title: "Chứng nhận ISO 13485",
    description: "Đạt được chứng nhận quốc tế về hệ thống quản lý chất lượng thiết bị y tế",
    highlight: "Chất lượng",
  },
  {
    year: "2019",
    title: "Đối tác chiến lược",
    description: "Trở thành đại lý chính thức của các thương hiệu y tế hàng đầu thế giới",
    highlight: "Hợp tác",
  },
  {
    year: "2022",
    title: "Chuyển đổi số",
    description: "Ra mắt nền tảng thương mại điện tử và hệ thống quản lý khách hàng hiện đại",
    highlight: "Công nghệ",
  },
  {
    year: "2024",
    title: "Mở rộng toàn quốc",
    description: "Phủ sóng 63 tỉnh thành với mạng lưới phân phối và dịch vụ hoàn thiện",
    highlight: "Toàn quốc",
  },
]

export function CompanyHistory() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Hành trình phát triển</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            15 năm không ngừng nỗ lực để mang đến những giải pháp y tế tốt nhất
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border hidden lg:block"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                <div className="flex-1 lg:pr-8">
                  <Card
                    className={`${index % 2 === 0 ? "lg:ml-auto lg:mr-0" : "lg:mr-auto lg:ml-0"} max-w-md hover:shadow-lg transition-shadow`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl font-bold text-primary">{milestone.year}</div>
                        <Badge variant="outline">{milestone.highlight}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="hidden lg:block w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>

                <div className="flex-1 lg:pl-8"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
