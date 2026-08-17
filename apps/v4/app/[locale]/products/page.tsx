import type { Metadata } from "next"

import { productGroups, products } from "@/content/products"
import { Reveal } from "@/components/motion/reveal"
import { ProductCard } from "@/components/products/product-card"
import { isLocale } from "@/i18n/config"

export const metadata: Metadata = { title: "Products", description: "Explore the SONA-GLOBAL product ecosystem." }

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params
  const locale = isLocale(routeLocale) ? routeLocale : "vi"
  return <div className="container py-16 md:py-24"><Reveal><p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">SONA-GLOBAL / PRODUCTS</p><h1 className="mt-5 max-w-3xl text-5xl font-bold tracking-[-0.075em] md:text-7xl">{locale === "vi" ? <>Sản phẩm được tạo ra để <span className="text-primary">tiến về phía trước.</span></> : <>Products built to <span className="text-primary">move forward.</span></>}</h1></Reveal><div className="mt-16 space-y-16">{Object.entries(productGroups).map(([group, label]) => <section key={group}><Reveal><div className="mb-5 flex items-center gap-3"><span className="h-px flex-1 bg-border" /><h2 className="text-sm font-bold tracking-[0.12em] uppercase">{label[locale]}</h2></div></Reveal><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{products.filter((product) => product.group === group).map((product, index) => <Reveal delay={index * 0.08} key={product.slug}><ProductCard locale={locale} product={product} /></Reveal>)}</div></section>)}</div></div>
}
