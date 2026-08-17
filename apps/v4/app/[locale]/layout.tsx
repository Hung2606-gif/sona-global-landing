import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { MarketingFooter } from "@/components/layout/marketing-footer"
import { MarketingHeader } from "@/components/layout/marketing-header"
import { SonaGlobalAssistant } from "@/components/chat/sona-global-assistant"
import { isLocale, locales } from "@/i18n/config"
import { getDictionary } from "@/i18n/request"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const title = locale === "vi" ? "Sản phẩm số cho tín hiệu có ý nghĩa" : "Digital products for meaningful signals"
  const description = locale === "vi" ? "SONA-GLOBAL xây dựng sản phẩm AI, nền tảng và trải nghiệm số cho người dùng toàn cầu." : "SONA-GLOBAL builds AI products, platforms, and digital experiences for global users."
  return { title, description, alternates: { canonical: `/${locale}`, languages: { vi: "/vi", en: "/en" } }, openGraph: { locale: locale === "vi" ? "vi_VN" : "en_US", title, description } }
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dictionary = getDictionary(locale)
  return <div className="sona-global-shell min-h-screen"><MarketingHeader locale={locale} labels={dictionary.navigation} /><main lang={locale}>{children}</main><MarketingFooter locale={locale} description={dictionary.footer.description} rights={dictionary.footer.rights} /><SonaGlobalAssistant locale={locale} /></div>
}
