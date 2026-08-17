import type { Metadata } from "next"

import { Reveal } from "@/components/motion/reveal"
import { isLocale } from "@/i18n/config"

export const metadata: Metadata = { title: "Ecosystem", description: "How SONA-GLOBAL products and teams create a connected ecosystem." }

export default async function EcosystemPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params
  const locale = isLocale(routeLocale) ? routeLocale : "vi"
  const content = locale === "vi" ? { title: <>Nhiều sản phẩm.<br /><span className="text-primary">Một hệ tín hiệu.</span></>, intro: "Từ AI tạo nội dung đến hạ tầng dữ liệu, mỗi sản phẩm SONA-GLOBAL đều chia sẻ cùng một nguyên tắc: công nghệ phải giúp con người thấy rõ và làm tốt hơn.", steps: [["01", "Understand", "Lắng nghe hành vi, bối cảnh và những rào cản thực sự."], ["02", "Build", "Kết nối dữ liệu, thiết kế và kỹ thuật thành sản phẩm dễ dùng."], ["03", "Learn", "Đo lường có trách nhiệm để cải thiện liên tục."]] } : { title: <>Many products.<br /><span className="text-primary">One signal system.</span></>, intro: "From generative AI to data infrastructure, every SONA-GLOBAL product shares one principle: technology should help people see more clearly and do better work.", steps: [["01", "Understand", "Listen to behaviour, context, and real-world friction."], ["02", "Build", "Connect data, design, and engineering into products people can use."], ["03", "Learn", "Measure responsibly and improve continuously."]] }
  return <div className="container py-16 md:py-24"><Reveal><p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">SONA-GLOBAL / ECOSYSTEM</p><h1 className="mt-5 text-5xl font-bold tracking-[-0.075em] md:text-7xl">{content.title}</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">{content.intro}</p></Reveal><div className="mt-16 grid overflow-hidden rounded-2xl border border-border md:grid-cols-3">{content.steps.map(([number, title, text], index) => <Reveal className="min-h-64 border-b border-border p-7 last:border-b-0 md:border-r md:last:border-r-0 md:last:border-b-0" delay={index * 0.1} key={number}><p className="text-xs font-bold text-primary">{number}</p><h2 className="mt-20 text-2xl font-bold tracking-[-0.055em]">{title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></Reveal>)}</div></div>
}
