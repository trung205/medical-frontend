"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Menu, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProductTypes } from "@/hooks/user/useProductTypes";
import SearchBox from "./ui/search-box";
import Image from "next/image";

export function Header() {
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const pathname = usePathname();

  const { data: productTypesData }: any = useProductTypes({});

  const formattedProductTypes = useMemo(() => {
    return productTypesData?.data?.map((item: any) => ({
      name: item.name,
      href: `/san-pham/${item.slug}`,
    }));
  }, [productTypesData]);

  const isActive = (path: string) => {
    return pathname === path;
  };
  return (
    <header className="border-b border-border bg-[#e5eff3]">
      <div className="bg-primary text-primary-foreground py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm md:text-base font-medium">
            Công nghệ Sinh học - Nơi những tế bào nhỏ bé tạo nên giá trị lớn lao
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 bg-[#e5eff3]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-primary">
              <Image
                src={"/logo.jpeg"}
                alt={`Logo}`}
                width={73}
                height={32}
                className="object-cover"
              />
            </Link>
            <nav className="hidden lg:flex items-center gap-6">
              <Link
                href="/"
                className={`text-foreground hover:text-primary transition-colors relative ${
                  isActive("/") ? "text-primary font-semibold" : ""
                }`}
              >
                Trang chủ
                {isActive("/") && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setShowProductDropdown(true)}
              >
                <button
                  className={`text-foreground hover:text-primary transition-colors flex items-center gap-1 relative ${
                    pathname?.startsWith("/san-pham")
                      ? "text-primary font-semibold"
                      : ""
                  }`}
                >
                  Sản phẩm
                  <ChevronDown className="h-4 w-4" />
                  {pathname?.startsWith("/san-pham") && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>

                {showProductDropdown && (
                  <div
                    className="absolute top-full left-0 mt-2 w-36 bg-card border border-border rounded-lg shadow-lg py-2 z-50"
                    onMouseEnter={() => setShowProductDropdown(true)}
                    onMouseLeave={() => setShowProductDropdown(false)}
                  >
                    {formattedProductTypes?.map((type: any, index: number) => (
                      <Link
                        key={index}
                        href={type.href}
                        className="block px-4 py-2 text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {type.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href="/giai-phap"
                className={`text-foreground hover:text-primary transition-colors relative ${
                  isActive("/giai-phap") ? "text-primary font-semibold" : ""
                }`}
              >
                Giải pháp
                {isActive("/giai-phap") && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>

              <Link
                href="/blog"
                className={`text-foreground hover:text-primary transition-colors relative ${
                  pathname?.startsWith("/blog")
                    ? "text-primary font-semibold"
                    : ""
                }`}
              >
                Blog
                {pathname?.startsWith("/blog") && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>

              <Link
                href="/gioi-thieu"
                className={`text-foreground hover:text-primary transition-colors relative ${
                  isActive("/gioi-thieu") ? "text-primary font-semibold" : ""
                }`}
              >
                Về chúng tôi
                {isActive("/gioi-thieu") && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>

              <Link
                href="/tuyen-dung"
                className={`text-foreground hover:text-primary transition-colors relative ${
                  isActive("/tuyen-dung") ? "text-primary font-semibold" : ""
                }`}
              >
                Tuyển dụng
                {isActive("/tuyen-dung") && ( 
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>

              <Link
                href="/lien-he"
                className={`text-foreground hover:text-primary transition-colors relative ${
                  isActive("/lien-he") ? "text-primary font-semibold" : ""  
                }`}
              >
                Liên hệ
                {isActive("/lien-he") && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* <div className="hidden md:flex items-center bg-secondary rounded-lg px-3 py-2 min-w-[300px]">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Tìm kiếm thiết bị y tế..."
                className="bg-transparent border-none outline-none flex-1 text-sm"
              />
            </div> */}
            <SearchBox />
            {/* <Button
              variant="outline"
              size="icon"
              className="relative bg-transparent"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button> */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden bg-transparent"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
