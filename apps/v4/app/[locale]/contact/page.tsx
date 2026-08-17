import type { Metadata } from "next"

import { isLocale } from "@/i18n/config"

export const metadata: Metadata = { title: "Contact" }

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params
  const vi = isLocale(routeLocale) ? routeLocale === "vi" : true
  return <div className="container py-20 md:py-32"><p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">SONA-GLOBAL / CONTACT</p><h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-[-0.08em] md:text-8xl">{vi ? <>Bạn đang tìm<br /><span className="text-primary">một đội ngũ?</span></> : <>Looking for<br /><span className="text-primary">a team?</span></>}</h1><a className="mt-10 inline-flex border-b border-primary pb-2 text-xl font-semibold text-primary transition hover:gap-4" href="mailto:nguyenhoainam.090801@gmail.com">nguyenhoainam.090801@gmail.com ↗</a></div>
}
