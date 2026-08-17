import Link from "next/link"

import { products } from "@/content/products"
import { Reveal } from "@/components/motion/reveal"
import { ProductCard } from "@/components/products/product-card"
import { isLocale } from "@/i18n/config"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params
  const locale = isLocale(routeLocale) ? routeLocale : "vi"
  const copy = locale === "vi" ? {
    eyebrow: "DIGITAL PRODUCT STUDIO / HANOI · GLOBAL",
    title: <>Tạo tín hiệu<br /><span className="text-primary">trong nhiễu ồn.</span></>,
    text: "SONA-GLOBAL kết hợp chiến lược, AI và thiết kế để biến những tương tác nhỏ thành trải nghiệm có ích cho hàng triệu người dùng.",
    explore: "Khám phá hệ sinh thái", numbers: ["48M+", "16", "9.4 PB"], labels: ["tương tác mỗi tháng", "thị trường đang vận hành", "dữ liệu được xử lý mỗi năm"],
    productTitle: <>Từ ý tưởng<br />đến <span className="text-primary">ảnh hưởng.</span></>,
    principles: ["Bắt đầu từ vấn đề thật", "Thiết kế có ý thức", "Học không ngừng"],
  } : {
    eyebrow: "DIGITAL PRODUCT STUDIO / HANOI · GLOBAL",
    title: <>Make signal<br /><span className="text-primary">from noise.</span></>,
    text: "SONA-GLOBAL combines strategy, AI, and design to turn small interactions into useful experiences for millions of people.",
    explore: "Explore the ecosystem", numbers: ["48M+", "16", "9.4 PB"], labels: ["monthly interactions", "active markets", "data processed each year"],
    productTitle: <>From an idea<br />to <span className="text-primary">impact.</span></>,
    principles: ["Start with real friction", "Design with intent", "Keep learning"],
  }
  return <><section className="container relative isolate overflow-hidden py-24 md:py-36"><div className="sona-global-grid pointer-events-none absolute inset-0 -z-10 opacity-50" /><div className="sona-global-orb absolute -right-24 top-10 -z-10 size-80 rounded-full bg-cyan-300/25" /><div className="sona-global-orb sona-global-orb-delayed absolute -bottom-16 left-1/4 -z-10 size-72 rounded-full bg-violet-400/20" /><Reveal><p className="mb-6 text-xs font-bold tracking-[0.16em] text-muted-foreground">{copy.eyebrow}</p></Reveal><Reveal delay={0.08}><h1 className="max-w-5xl text-6xl font-extrabold tracking-[-0.085em] text-balance md:text-8xl lg:text-9xl">{copy.title}</h1></Reveal><Reveal delay={0.16} className="mt-10 flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><p className="max-w-md text-base leading-7 text-muted-foreground">{copy.text}</p><Link href={`/${locale}/products`} className="w-fit rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:-translate-y-1 hover:shadow-lg">{copy.explore} ↓</Link></Reveal></section><section className="container grid border-y border-border sm:grid-cols-3">{copy.numbers.map((number, index) => <Reveal className="border-b border-border p-6 last:border-b-0 sm:border-r sm:last:border-r-0 sm:last:border-b-0" delay={index * 0.08} key={number}><p className="text-4xl font-bold tracking-[-0.065em] text-primary md:text-5xl">{number}</p><p className="mt-3 max-w-44 text-sm leading-5 text-muted-foreground">{copy.labels[index]}</p></Reveal>)}</section><section className="container py-24 md:py-32"><Reveal><p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">01 / ECOSYSTEM</p><h2 className="mt-6 text-4xl font-bold tracking-[-0.07em] md:text-6xl">{copy.productTitle}</h2></Reveal><div className="mt-12 grid gap-5 md:grid-cols-2">{products.filter((product) => product.featured).map((product, index) => <Reveal delay={index * 0.1} key={product.slug}><ProductCard locale={locale} product={product} /></Reveal>)}</div></section><section className="border-y border-border bg-muted/30"><div className="container py-24 md:py-32"><Reveal><p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">02 / OUR PRACTICE</p><h2 className="mt-6 max-w-4xl text-4xl font-bold tracking-[-0.07em] md:text-6xl">{locale === "vi" ? <>Công nghệ không cần ồn ào.<br /><span className="text-primary">Nó cần hữu ích.</span></> : <>Technology need not be loud.<br /><span className="text-primary">It needs to be useful.</span></>}</h2></Reveal><div className="mt-12 grid gap-5 md:grid-cols-3">{copy.principles.map((principle, index) => <Reveal className="border-t border-border pt-5" delay={index * 0.1} key={principle}><p className="text-xs font-bold text-primary">0{index + 1}</p><h3 className="mt-10 text-xl font-bold tracking-[-0.04em]">{principle}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{locale === "vi" ? "Mọi quyết định đều có căn cứ từ người dùng, dữ liệu và trách nhiệm dài hạn." : "Every decision is grounded in people, data, and long-term responsibility."}</p></Reveal>)}</div></div></section></>
}
