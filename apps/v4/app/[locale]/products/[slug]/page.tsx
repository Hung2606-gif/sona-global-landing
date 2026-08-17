import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getProduct, products } from "@/content/products"
import { Reveal } from "@/components/motion/reveal"
import { isLocale, locales } from "@/i18n/config"

export function generateStaticParams() { return locales.flatMap((locale) => products.map((product) => ({ locale, slug: product.slug }))) }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const product = getProduct(slug)
  if (!product || !isLocale(locale)) return {}
  return { title: product.name, description: product.description[locale], alternates: { canonical: `/${locale}/products/${slug}`, languages: { vi: `/vi/products/${slug}`, en: `/en/products/${slug}` } } }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: routeLocale, slug } = await params
  if (!isLocale(routeLocale)) notFound()
  const product = getProduct(slug)
  if (!product) notFound()
  const locale = routeLocale
  return <div className="container py-16 md:py-24"><Link className="text-sm font-semibold text-muted-foreground transition hover:text-foreground" href={`/${locale}/products`}>← {locale === "vi" ? "Tất cả sản phẩm" : "All products"}</Link><div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_.9fr]"><Reveal><p className="text-xs font-bold tracking-[0.15em] text-primary uppercase">{product.eyebrow[locale]}</p><h1 className="mt-5 text-6xl font-bold tracking-[-0.08em] md:text-8xl">{product.name}</h1><p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">{product.longDescription[locale]}</p><Link className="mt-9 inline-flex rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground" href={`/${locale}/contact`}>{locale === "vi" ? "Trao đổi cùng SONA-GLOBAL" : "Talk to SONA-GLOBAL"} ↗</Link></Reveal><Reveal delay={0.12} className="relative min-h-80 overflow-hidden rounded-3xl border border-border bg-card p-8"><div className={`absolute inset-0 opacity-70 ${product.accent === "cyan" ? "bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,.35),transparent_40%)]" : product.accent === "lime" ? "bg-[radial-gradient(circle_at_80%_20%,rgba(163,230,53,.35),transparent_40%)]" : "bg-[radial-gradient(circle_at_80%_20%,rgba(167,139,250,.35),transparent_40%)]"}`} /><div className="relative"><p className="text-xs font-bold tracking-[0.14em] text-muted-foreground">WHAT IT ENABLES</p><ul className="mt-10 space-y-5">{product.highlights[locale].map((highlight, index) => <li className="flex gap-4 text-xl font-semibold tracking-[-0.04em]" key={highlight}><span className="text-primary">0{index + 1}</span>{highlight}</li>)}</ul></div></Reveal></div></div>
}
