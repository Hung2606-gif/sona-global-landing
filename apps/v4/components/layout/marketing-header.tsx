"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { useTheme } from "next-themes"

import type { Locale } from "@/i18n/config"

const navigation = [{ href: "", key: "home" }, { href: "/products", key: "products" }, { href: "/ecosystem", key: "ecosystem" }, { href: "/careers", key: "careers" }] as const
type Labels = Record<(typeof navigation)[number]["key"] | "start", string>

export function MarketingHeader({ locale, labels }: { locale: Locale; labels: Labels }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const nextLocale = locale === "vi" ? "en" : "vi"
  const alternatePath = pathname.replace(/^\/(vi|en)(?=\/|$)/, `/${nextLocale}`)
  return <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl"><div className="container flex h-16 items-center justify-between"><Link href={`/${locale}`} className="flex items-center gap-2 font-bold tracking-[-0.04em]" aria-label="SONA-GLOBAL homepage"><span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground">S</span><span>SONA-GLOBAL</span></Link><nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex" aria-label="Main navigation">{navigation.map((item) => <Link className="transition-colors hover:text-foreground" href={`/${locale}${item.href}`} key={item.key}>{labels[item.key]}</Link>)}</nav><div className="hidden items-center gap-2 lg:flex"><button className="rounded-md px-2 py-1 text-xs font-semibold hover:bg-muted" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} type="button" aria-label="Toggle colour theme">{resolvedTheme === "dark" ? "☼" : "◐"}</button><Link className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5" href={`/${locale}/contact`}>{labels.start} ↗</Link><Link className="rounded-md border border-border px-2 py-1 text-xs font-semibold" href={alternatePath}>{nextLocale.toUpperCase()}</Link></div><button className="rounded-md border border-border p-2 lg:hidden" onClick={() => setOpen((value) => !value)} type="button" aria-expanded={open} aria-label="Open navigation">☰</button></div>{open ? <nav className="container flex flex-col gap-1 border-t border-border py-3 lg:hidden" aria-label="Mobile navigation">{navigation.map((item) => <Link className="rounded-md px-3 py-2 text-sm hover:bg-muted" href={`/${locale}${item.href}`} key={item.key} onClick={() => setOpen(false)}>{labels[item.key]}</Link>)}<div className="mt-2 flex gap-2 px-3"><Link className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground" href={`/${locale}/contact`}>{labels.start}</Link><Link className="rounded-md border border-border px-3 py-2 text-xs font-semibold" href={alternatePath}>{nextLocale.toUpperCase()}</Link></div></nav> : null}</header>
}
