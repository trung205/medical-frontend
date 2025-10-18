import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import 'tiptap-extension-resizable-image/styles.css';


export const metadata: Metadata = {
  title: "NDBio - Thiết Bị Y Tế Chuyên Nghiệp",
  description: "Cung cấp thiết bị y tế chất lượng cao cho các cơ sở y tế và bệnh viện",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
       
      </body>
    </html>
  )
}
