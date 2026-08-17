import type { Metadata } from "next"

import { isLocale } from "@/i18n/config"

export const metadata: Metadata = { title: "Apply", robots: { index: false, follow: false } }

export default async function ApplyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params
  const locale = isLocale(routeLocale) ? routeLocale : "vi"
  const vi = locale === "vi"
  const subject = encodeURIComponent(vi ? "Ứng tuyển tại SONA-GLOBAL" : "Application to SONA-GLOBAL")

  return (
    <div className="container grid gap-12 py-16 md:grid-cols-[0.75fr_1.25fr] md:py-24">
      <div>
        <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">SONA-GLOBAL / APPLY</p>
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.07em] md:text-5xl">
          {vi ? "Kể cho chúng tôi về bạn." : "Tell us about yourself."}
        </h1>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <p className="max-w-xl text-base leading-7 text-muted-foreground">
          {vi
            ? "SONA-GLOBAL là landing page nên không thu thập hoặc lưu hồ sơ trực tiếp trên website. Hãy gửi CV và vị trí bạn quan tâm qua email."
            : "SONA-GLOBAL is a landing page and does not collect or store applications on this website. Please email your CV and the role you are interested in."}
        </p>
        <a
          className="mt-8 inline-flex rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg"
          href={`mailto:nguyenhoainam.090801@gmail.com?subject=${subject}`}
        >
          {vi ? "Gửi CV qua email" : "Send your CV by email"} ↗
        </a>
      </div>
    </div>
  )
}
