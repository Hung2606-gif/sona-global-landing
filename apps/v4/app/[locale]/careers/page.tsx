import type { Metadata } from "next"
import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { isLocale } from "@/i18n/config"

export const metadata: Metadata = { title: "Careers", description: "Join the SONA-GLOBAL product team." }

const roles = ["Product Designer", "Frontend Engineer", "Backend Engineer", "Product Manager"]

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params
  const locale = isLocale(routeLocale) ? routeLocale : "vi"
  const vi = locale === "vi"
  return <div className="container py-16 md:py-24"><Reveal><p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">SONA-GLOBAL / CAREERS</p><h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-[-0.075em] md:text-7xl">{vi ? <>Xây những thứ<br /><span className="text-primary">đáng để dùng.</span></> : <>Build things<br /><span className="text-primary">worth using.</span></>}</h1><p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">{vi ? "Chúng tôi tìm những người tò mò, tử tế và muốn tạo ra sản phẩm tốt hơn mỗi ngày." : "We are looking for curious, kind people who want to make better products every day."}</p></Reveal><section className="mt-16"><Reveal><h2 className="text-xl font-bold">{vi ? "Vị trí đang mở" : "Open roles"}</h2></Reveal><div className="mt-5 border-t border-border">{roles.map((role, index) => <Reveal key={role} delay={index * 0.06}><Link href={`/${locale}/careers/apply?role=${encodeURIComponent(role)}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-border py-5 transition hover:px-3 hover:bg-muted/60"><span className="text-xs font-bold text-primary">0{index + 1}</span><div><h3 className="text-lg font-bold tracking-[-0.04em]">{role}</h3><p className="mt-1 text-sm text-muted-foreground">Hanoi · Hybrid · Full-time</p></div><span className="text-lg transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span></Link></Reveal>)}</div></section><Reveal className="mt-16 rounded-2xl border border-border bg-muted/40 p-8"><p className="text-xl font-bold tracking-[-0.04em]">{vi ? "Chưa thấy vị trí phù hợp?" : "Do not see the right role?"}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{vi ? "Hãy gửi hồ sơ mở. Chúng tôi luôn muốn gặp những người giỏi." : "Send an open application. We always want to meet great people."}</p><Link className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground" href={`/${locale}/careers/apply`}>{vi ? "Gửi hồ sơ" : "Apply now"} ↗</Link></Reveal></div>
}
