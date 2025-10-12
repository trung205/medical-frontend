import { Providers } from "@/app/providers";

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
