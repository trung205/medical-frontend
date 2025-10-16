import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, TrendingUp, Award } from "lucide-react"

export function RecruitmentHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4">Cơ hội nghề nghiệp</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Tham gia đội ngũ NDBio</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Chúng tôi đang tìm kiếm những tài năng xuất sắc để cùng phát triển công nghệ sinh học tiên tiến
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Môi trường chuyên nghiệp</h3>
            <p className="text-sm text-muted-foreground text-center">Làm việc với công nghệ hiện đại</p>
          </div>

          <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Đội ngũ tài năng</h3>
            <p className="text-sm text-muted-foreground text-center">Học hỏi từ các chuyên gia hàng đầu</p>
          </div>

          <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Phát triển sự nghiệp</h3>
            <p className="text-sm text-muted-foreground text-center">Cơ hội thăng tiến rõ ràng</p>
          </div>

          <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Đãi ngộ hấp dẫn</h3>
            <p className="text-sm text-muted-foreground text-center">Lương thưởng cạnh tranh</p>
          </div>
        </div>
      </div>
    </section>
  )
}
