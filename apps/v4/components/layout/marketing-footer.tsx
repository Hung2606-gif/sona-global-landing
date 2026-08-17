import Link from "next/link"

import type { Locale } from "@/i18n/config"

export function MarketingFooter({ locale, description, rights }: { locale: Locale; description: string; rights: string }) {
  return <footer className="border-t border-border bg-muted/30"><div className="container grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]"><div><div className="mb-3 text-lg font-bold tracking-[-0.04em]">SONA-GLOBAL</div><p className="max-w-xs text-sm leading-6 text-muted-foreground">{description}</p></div><div className="space-y-2 text-sm"><p className="font-semibold">Explore</p><Link className="block text-muted-foreground hover:text-foreground" href={`/${locale}/products`}>Products</Link><Link className="block text-muted-foreground hover:text-foreground" href={`/${locale}/careers`}>Careers</Link></div><div className="space-y-2 text-sm"><p className="font-semibold">Contact</p><a className="block text-muted-foreground hover:text-foreground" href="mailto:nguyenhoainam.090801@gmail.com">nguyenhoainam.090801@gmail.com</a><Link className="block text-muted-foreground hover:text-foreground" href={`/${locale}/privacy`}>Privacy</Link><Link className="block text-muted-foreground hover:text-foreground" href={`/${locale}/terms`}>Terms</Link></div></div><div className="container border-t border-border py-4 text-xs text-muted-foreground">{rights}</div></footer>
}
