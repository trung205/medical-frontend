"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RecruitmentHero } from "@/components/recruitment-hero";
import { RecruitmentForm } from "@/components/recruitment-form";
import { RecruitmentBenefits } from "@/components/recruitment-benefits";
import { useBlogs } from "@/hooks/user/useBlogs";
import { FeaturedBlogs } from "@/components/featured-blogs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function RecruitmentPage() {
  const router = useRouter();
  const { data: blogs }: any = useBlogs({
    tagSlug: "tuyen-dung",
    limit: 3,
  });

  const handleShowDetail = () => {
    window.history.pushState({}, "", "/#recruitment-form");
  };

  const sectionFormRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
     if (sectionFormRef.current) {
      const offset = 0; // 👉 khoảng cách muốn chừa lại (px)
      const top =
        sectionFormRef.current.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen">
      <Header />
      <RecruitmentHero />
      <div className="text-center my-6">
        <Button
          variant="outline"
          size="xxl"
          onClick={handleScroll}
          className="bg-[#e5eff3] text-foreground text-2xl font-bold"
        >
          Ứng tuyển ngay
        </Button>
      </div>
      <FeaturedBlogs
        className="bg-[#e5eff3]"
        blogs={blogs?.data || []}
        title="Vị trí tuyển dụng"
        description=""
        handleShowBlogs={() => router.push("/blog/tags/tuyen-dung")}
      />

      <div ref={sectionFormRef}>
        <RecruitmentForm />
      </div>
      <RecruitmentBenefits />
      <Footer />
    </main>
  );
}
