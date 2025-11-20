import { Phone, Mail, MapPin, Facebook, Youtube, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">NDBio</h3>
            {/* <p className="text-primary-foreground/80 text-sm">
              Đối tác tin cậy trong việc cung cấp thiết bị y tế chất lượng cao cho các cơ sở y tế trên toàn quốc.
            </p> */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/ndbiovn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
              </a>
               <a href="https://www.youtube.com/@NDBioVN" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
              </a>
              {/*<a href="https://www.linkedin.com/company/medequip-pro" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
              </a> */}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Sản phẩm</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a
                  href="/san-pham/thiet-bi"
                  className="hover:text-accent transition-colors"
                >
                  Thiết bị
                </a>
              </li>
              <li>
                <a
                  href="/san-pham/hoa-chat"
                  className="hover:text-accent transition-colors"
                >
                  Hóa chất
                </a>
              </li>
              <li>
                <a
                  href="/san-pham/vat-tu"
                  className="hover:text-accent transition-colors"
                >
                  Vật tư
                </a>
              </li>
              <li>
                <a
                  href="/giai-phap"
                  className="hover:text-accent transition-colors"
                >
                  Giải pháp
                </a>
              </li>
              {/* <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Phụ kiện y tế
                </a>
              </li> */}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Dịch vụ</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Chính sách bảo hành
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Lắp đặt thiết bị
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Chính sách kiểm hàng và đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              {/* <li>
                <a href="#" className="hover:text-accent transition-colors">
                  
                </a>
              </li> */}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Liên hệ</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <a href="tel:0828811300" target="_self" className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                <span>082 881 1300</span>
              </a>
              <a
                href="mailto:sales@ndbiovn.com"
                className="flex items-center gap-3"
                target="_self"
                rel="noopener noreferrer"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span>sales@ndbiovn.com</span>
              </a>
              
              <a
                href="https://maps.app.goo.gl/BQoftEEvoDY3WTR88"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3"
              >
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
                <span>
                  Số 4 Ngô Thì Nhậm, phường Hà Đông, Thành phố Hà Nội, Việt
                  Nam
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2025 NDBio. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
