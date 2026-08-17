import Link from "next/link"

import type { Locale } from "@/i18n/config"
import type { Product } from "@/types/product"

const accents = { cyan: "from-cyan-300/25 via-cyan-400/5 to-transparent", lime: "from-lime-300/25 via-lime-400/5 to-transparent", violet: "from-violet-300/25 via-violet-400/5 to-transparent" }

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  return <Link href={`/${locale}/products/${product.slug}`} className="group relative flex min-h-80 flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-2 hover:border-foreground/25 hover:shadow-2xl"><div className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-br ${accents[product.accent]}`} /><div className="relative flex items-start justify-between"><span className="rounded-full border border-border bg-background/65 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-muted-foreground uppercase">{product.group}</span><span className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></div><div className="relative mt-auto"><p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-[0.12em]">{product.eyebrow[locale]}</p><h3 className="text-2xl font-bold tracking-[-0.055em]">{product.name}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{product.description[locale]}</p></div></Link>
}
