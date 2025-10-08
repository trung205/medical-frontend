import { Button } from "@/components/ui/button"
import { ShoppingCart, Search, Menu, Phone, Mail } from "lucide-react"

export function Header() {
  return (
    <header className="bg-background border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Hotline: 1900-1234</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@medequippro.vn</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Miễn phí vận chuyển cho đơn hàng trên 10 triệu VNĐ</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-primary">MedEquip Pro</div>
            <nav className="hidden lg:flex items-center gap-6">
              <a href="/" className="text-foreground hover:text-primary transition-colors">
                Trang chủ
              </a>
              <a href="/products" className="text-foreground hover:text-primary transition-colors">
                Sản phẩm
              </a>
              <a href="/blog" className="text-foreground hover:text-primary transition-colors">
                Blog
              </a>
              <a href="/about" className="text-foreground hover:text-primary transition-colors">
                Về chúng tôi
              </a>
              <a href="/contact" className="text-foreground hover:text-primary transition-colors">
                Liên hệ
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-secondary rounded-lg px-3 py-2 min-w-[300px]">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Tìm kiếm thiết bị y tế..."
                className="bg-transparent border-none outline-none flex-1 text-sm"
              />
            </div>
            <Button variant="outline" size="icon" className="relative bg-transparent">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
            <Button variant="outline" size="icon" className="lg:hidden bg-transparent">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
