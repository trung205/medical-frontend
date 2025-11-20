import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Ông Trần Sơn Tùng",
    position: "Người sáng lập",
    experience: "20+ năm kinh nghiệm",
    specialization: `Giám đốc điều hành <br> Giám đốc kinh doanh`,
    image: "a16f721b-b57a-40cc-8381-83bf549d585e.jpeg",
    education: "MBA - Đại học Kinh tế TP.HCM",
  },
  {
    name: "Ông Trần Đức Quang",
    position: "Đồng sáng lập",
    experience: "15+ năm kinh nghiệm",
    specialization:
      `Trưởng phòng Quản lý sản phẩm <br> Trưởng phòng kỹ thuật và dịch vụ khách hàng`,
    image: "images/member/quang_tran.jpeg",
    education: "Tiến sĩ Kỹ thuật Y sinh - ĐH Bách Khoa",
  },
  {
    name: "Ông Phùng Xuân Minh",
    position: "Đồng sáng lập",
    experience: "12+ năm kinh nghiệm",
    specialization: `Quản Lý vận hành <br> Trưởng phòng marketing`,
    education: "Thạc sĩ Quản trị Kinh doanh",
    image: "/83ca66bd-360c-4626-a0a2-b553891942ce.jpeg",
  },
  // {
  //   name: "Phạm Thị Lan",
  //   position: "Giám Đốc Dịch Vụ",
  //   experience: "10+ năm kinh nghiệm",
  //   specialization: "Dịch vụ khách hàng, Đào tạo kỹ thuật",
  //   image: "/placeholder.svg?key=service",
  //   education: "Cử nhân Y khoa - ĐH Y Hà Nội",
  // },
];

const departments = [
  {
    name: "Bộ phận Kỹ thuật",
    count: "25+ kỹ sư",
    description: "Chuyên gia lắp đặt, bảo trì và sửa chữa thiết bị y tế",
  },
  {
    name: "Đội ngũ Tư vấn",
    count: "15+ chuyên viên",
    description: "Hỗ trợ khách hàng lựa chọn giải pháp phù hợp",
  },
  {
    name: "Bộ phận Đào tạo",
    count: "10+ giảng viên",
    description: "Đào tạo sử dụng thiết bị cho đội ngũ y tế",
  },
  {
    name: "Dịch vụ Khách hàng",
    count: "20+ nhân viên",
    description: "Hỗ trợ 24/7 và chăm sóc khách hàng",
  },
];

export function TeamSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Đội ngũ lãnh đạo</h2>
          {/* <p className="text-muted-foreground max-w-2xl mx-auto">
            Những chuyên gia hàng đầu với nhiều năm kinh nghiệm trong lĩnh vực
            thiết bị y tế
          </p> */}
        </div>

        {/* Leadership Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="relative w-72 h-72 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <div className="text-primary font-medium mb-2" dangerouslySetInnerHTML={{ __html: member.position }}></div>
                {/* <Badge variant="outline" className="mb-3">
                  {member.experience}
                </Badge> */}

                <p className="text-sm text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: member.specialization }}>
                </p>
                {/* <p className="text-xs text-muted-foreground mb-4">
                  {member.education}
                </p> */}

                {/* <div className="flex justify-center gap-2">
                  <button className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </button>
                  <button className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Mail className="h-4 w-4" />
                  </button>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Departments */}
        {/* <div className="bg-muted/30 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Đội ngũ chuyên nghiệp</h3>
            <p className="text-muted-foreground">Hơn 70 nhân viên tận tâm phục vụ khách hàng trên toàn quốc</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{dept.count}</div>
                <h4 className="font-semibold mb-2">{dept.name}</h4>
                <p className="text-sm text-muted-foreground">{dept.description}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
