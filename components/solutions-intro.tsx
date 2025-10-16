export function SolutionsIntro() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Giải pháp công nghệ</h2>
          <p className="text-muted-foreground text-center leading-relaxed mb-12">
            Chúng tôi cung cấp thiết bị và giải pháp công nghệ sinh học, từ tư vấn thiết kế đến lắp đặt dây chuyền sản
            xuất hoàn thiện. Từ nguyên liệu đầu vào đến quy trình sản xuất cụ thể, chúng tôi đảm bảo chất lượng sản phẩm
            tối ưu và hiệu quả kinh tế cao nhất.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">150+</div>
              <p className="text-muted-foreground">Sản phẩm công nghệ</p>
              <p className="text-sm text-muted-foreground">Hàng đầu</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">15</div>
              <p className="text-muted-foreground">Kinh nghiệm trong lĩnh vực</p>
              <p className="text-sm text-muted-foreground">Công nghệ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
