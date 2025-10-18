"use client";

import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturedBlogs } from "@/components/featured-blogs";
import { Footer } from "@/components/footer";
import { useBlogs } from "@/hooks/user/useBlogs";
import router from "next/router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Thiết bị lên men",
    description:
      "Cung cấp thiết bị lên men chất lượng cao cho ngành công nghiệp công nghệ sinh học tại Việt Nam.",
    image: "/industrial-production-line-bioreactor.avif",
  },
  {
    title: "Giải pháp toàn diện",
    description:
      "Mang đến giải pháp toàn diện cho đối tác ứng dụng công nghệ sinh học từ khâu phát triển nghiên cứu đến nhân rộng quy mô sản xuất.",
    image: "/laboratory-glassware-yellow-liquid.avif",
  },
  {
    title: "Hỗ trợ kỹ thuật",
    description:
      "Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ và tư vấn cho khách hàng về cả trang thiết bị, đến nguyên liệu, vật tư, quy trình đảm bảo vận hành hiệu quả.",
    image: "/engineer-with-hard-hat-and-wrench-3d.avif",
  },
];

const products = [
  {
    title: "Thiết bị",
    description:
      "Cung cấp thiết bị lên men chất lượng cao cho ngành công nghiệp công nghệ sinh học tại Việt Nam.",
    image: "/industrial-production-line-bioreactor.avif",
    href: "/san-pham/thiet-bi",
  },
  {
    title: "Vật tư",
    description:
      "Mang đến giải pháp toàn diện cho đối tác ứng dụng công nghệ sinh học từ khâu phát triển nghiên cứu đến nhân rộng quy mô sản xuất.",
    image: "/laboratory-glassware-yellow-liquid.avif",
    href: "/san-pham/vat-tu",
  },
  {
    title: "Hóa chất",
    description:
      "Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ và tư vấn cho khách hàng về cả trang thiết bị, đến nguyên liệu, vật tư, quy trình đảm bảo vận hành hiệu quả.",
    image: "/engineer-with-hard-hat-and-wrench-3d.avif",
    href: "/san-pham/hoa-chat",
  },
  {
    title: "Giải pháp",
    description:
      "Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ và tư vấn cho khách hàng về cả trang thiết bị, đến nguyên liệu, vật tư, quy trình đảm bảo vận hành hiệu quả.",
    image: "/engineer-with-hard-hat-and-wrench-3d.avif",
    href: "/giai-phap",
  },
];

export default function HomePage() {
  const { data: blogs }: any = useBlogs({
    limit: 3,
    isFeatured: true,
  });
  return (
    <main className="min-h-screen">
      <Header />
      {/* <HeroSection /> */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Video nền */}
        <video
          className="absolute top-0 left-0 w-full h-[720px] object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/4121618-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>

        {/* Lớp phủ */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Nội dung */}
        <div className="relative z-10 flex flex-col items-center py-32 h-full text-white">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 text-center">
            Giải pháp công nghệ sinh học toàn diện
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-center my-6">
            Chúng tôi cung cấp thiết bị và giải pháp công nghệ sinh học toàn
            diện tại Việt Nam.
          </p>
          <button
            className="my-12 border border-white py-4 px-8 text-white font-bold rounded-full"
            onClick={() => router.push("/blog")}
          >
            Xem thêm
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-white/10 text-white p-12 rounded text-center">
              <h2 className="text-xl font-bold mb-2">Thiết bị lên men</h2>
              <p>Giải pháp tối ưu cho quy trình sản xuất.</p>
            </div>
            <div className="bg-white/10 text-white p-12 rounded text-center">
              <h2 className="text-xl font-bold mb-2">Giải pháp toàn diện</h2>
              <p>Cung cấp thiết bị công nghệ tiên tiến nhất.</p>
            </div>
            <div className="bg-white/10 text-white p-12 rounded text-center">
              <h2 className="text-xl font-bold mb-2">Đối tác tin cậy</h2>
              <p>Hỗ trợ kỹ thuật chuyên nghiệp và tận tình.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 text-center">
              Giới thiệu về NDBio
            </h2>
            <p className="text-muted-foreground text-center leading-relaxed mb-12">
              Chúng tôi là công ty phân phối thiết bị công nghệ sinh học, chuyên
              cung cấp giải pháp toàn diện cho quy trình sản xuất ứng dụng công
              nghệ sinh học trong ngành công nghiệp tại Việt Nam.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">150+</div>
                <p className="text-muted-foreground">Sản phẩm chất lượng</p>
                <p className="text-sm text-muted-foreground"> hàng đầu</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">15</div>
                <p className="text-muted-foreground">
                  Đối tác đồng hành và tin tưởng
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#e5eff3]">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-2 text-center">
            Dịch vụ công nghệ
          </h2>
          <p className="text-muted-foreground text-center leading-relaxed mb-12">
            Chúng tôi cung cấp giải pháp thiết bị công nghệ sinh học cho quy
            trình sản xuất hiệu quả.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow !pt-0 gap-0"
              >
                <div className="relative h-[352.5px] w-full">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-center">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-36">
          <h2 className="text-5xl font-bold text-center mb-12">
            Sản phẩm cung ứng
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 cursor-pointer">
            {products.map((product, index) => (
              <Link href={product.href} key={index} className="block">
                <div className="overflow-hidden  !pt-0 gap-0">
                  <div className="relative h-[352.5px] w-full">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover rounded-3xl"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold mb-3 text-center">
                        {product.title}
                      </h3>
                      <div className="text-2xl font-bold text-primary">→</div>
                    </div>

                    {/* <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="bg-[#e5eff3]">
        <FeaturedBlogs
          blogs={blogs?.data || []}
          title="Tin tức sự kiện"
          handleShowBlogs={() => router.push("/blog")}
          titleClassName="lg:text-5xl font-bold mb-6 text-center"
        />
      </div>

      <Footer />
    </main>
  );
}
