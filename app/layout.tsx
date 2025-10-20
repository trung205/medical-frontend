import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import 'tiptap-extension-resizable-image/styles.css';


export const metadata: Metadata = {
  title: "NDBio - Giải pháp Công nghệ sinh học toàn diện",
  description: "Công ty phân phối thiết bị và giải pháp toàn diện cho công nghệ sinh học tại Việt Nam | NDbio",
  generator: "ndbiovn.com",
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
