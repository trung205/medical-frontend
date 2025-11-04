export function BlogHero({title, description}: any) {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{title || "Blog"}</h1>
        </div>
      </div>
    </section>
  )
}
