import type { Metadata } from "next"

import { META_THEME_COLORS, siteConfig } from "@/lib/config"
import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

import "@/app/globals.css"
import "@/app/sona-global.css"

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4000"

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s — ${siteConfig.name}` },
  metadataBase: new URL(siteUrl),
  description: siteConfig.description,
  keywords: ["SONA-GLOBAL", "AI", "digital products", "Vietnam technology"],
  authors: [{ name: "SONA-GLOBAL", url: siteUrl }],
  creator: "SONA-GLOBAL",
  openGraph: { type: "website", locale: "vi_VN", url: siteUrl, title: siteConfig.name, description: siteConfig.description, siteName: siteConfig.name, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "SONA-GLOBAL" }] },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: ["/opengraph-image"] },
  icons: { icon: "/favicon.ico" },
  manifest: "/manifest.webmanifest",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" suppressHydrationWarning className={cn(fontVariables, "[--header-height:calc(var(--spacing)*16)]")}><head><meta name="theme-color" content={META_THEME_COLORS.light} /></head><body className="group/body min-h-screen bg-background text-foreground antialiased"><ThemeProvider>{children}</ThemeProvider></body></html>
}
