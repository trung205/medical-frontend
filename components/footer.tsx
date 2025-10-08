import { Phone, Mail, MapPin, Facebook, Youtube, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">MedEquip Pro</h3>
            <p className="text-primary-foreground/80 text-sm">
              Đối tác tin cậy trong việc cung cấp thiết bị y tế chất lượng cao cho các cơ sở y tế trên toàn quốc.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
              <Youtube className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
              <Linkedin className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Sản phẩm</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Thiết bị chẩn đoán
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Thiết bị tim mạch
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Thiết bị thần kinh
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Thiết bị xét nghiệm
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Phụ kiện y tế
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Dịch vụ</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Tư vấn kỹ thuật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Lắp đặt thiết bị
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Bảo trì định kỳ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Đào tạo sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Hỗ trợ 24/7
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Liên hệ</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                <span>1900-1234</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <span>info@medequippro.vn</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2025 MedEquip Pro. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
