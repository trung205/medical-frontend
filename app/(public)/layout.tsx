import { Providers } from "@/app/providers"; // dùng store public

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers type="public">{children}</Providers>
    </>
  );
}
