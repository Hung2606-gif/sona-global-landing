import type { Product, ProductGroup } from "@/types/product"

export const productGroups: Record<ProductGroup, { en: string; vi: string }> = {
  ai: { vi: "Sản phẩm AI", en: "AI products" },
  consumer: { vi: "Ứng dụng tiêu dùng", en: "Consumer apps" },
  platform: { vi: "Nền tảng", en: "Platforms" },
}

export const products: Product[] = [
  {
    slug: "luma-ai",
    group: "ai",
    name: "Luma AI",
    eyebrow: { vi: "Tạo nội dung có định hướng", en: "Directed content creation" },
    description: { vi: "Biến brief thành nội dung nhất quán cho đội ngũ tăng trưởng.", en: "Turn a brief into consistent content for growth teams." },
    longDescription: { vi: "Luma AI kết hợp ngữ cảnh thương hiệu, kho nội dung và quy trình phê duyệt để giúp đội ngũ tạo nhanh nhưng vẫn giữ đúng tiếng nói sản phẩm.", en: "Luma AI combines brand context, a content library, and approval flows so teams can move fast without losing their product voice." },
    highlights: { vi: ["Brand-aware workspace", "Luồng duyệt minh bạch", "Thư viện prompt dùng chung"], en: ["Brand-aware workspace", "Clear approval flows", "Shared prompt library"] },
    accent: "cyan",
    featured: true,
  },
  {
    slug: "pulse-insight",
    group: "ai",
    name: "Pulse Insight",
    eyebrow: { vi: "Nhìn rõ tín hiệu tăng trưởng", en: "See growth signals clearly" },
    description: { vi: "Kết nối hành vi người dùng với các quyết định sản phẩm hằng ngày.", en: "Connect user behaviour to everyday product decisions." },
    longDescription: { vi: "Pulse gom những tín hiệu rời rạc thành insight có thể hành động, giúp đội ngũ nhận ra điểm nghẽn trước khi chúng thành vấn đề lớn.", en: "Pulse turns scattered signals into actionable insight, helping teams spot friction before it becomes a bigger problem." },
    highlights: { vi: ["Cohort dễ đọc", "Cảnh báo bất thường", "Báo cáo theo vai trò"], en: ["Readable cohorts", "Anomaly alerts", "Role-based reports"] },
    accent: "lime",
    featured: true,
  },
  {
    slug: "thread-cloud",
    group: "platform",
    name: "Thread Cloud",
    eyebrow: { vi: "Luồng dữ liệu thống nhất", en: "One connected data flow" },
    description: { vi: "Nền tảng kết nối dữ liệu, đội ngũ và workflow trong một không gian an toàn.", en: "A platform that connects data, teams, and workflows in one secure space." },
    longDescription: { vi: "Thread giúp các hệ thống quan trọng trao đổi dữ liệu theo quyền hạn rõ ràng, dễ kiểm toán và dễ mở rộng.", en: "Thread lets critical systems exchange data through explicit permissions, strong auditability, and room to scale." },
    highlights: { vi: ["API theo quyền", "Lịch sử thay đổi", "Tích hợp linh hoạt"], en: ["Permissioned APIs", "Change history", "Flexible integrations"] },
    accent: "violet",
  },
  {
    slug: "orbit-mobile",
    group: "consumer",
    name: "Orbit Mobile",
    eyebrow: { vi: "Trải nghiệm cá nhân hoá", en: "A personal daily experience" },
    description: { vi: "Ứng dụng nhẹ, nhanh và biết điều gì hữu ích với từng người dùng.", en: "A lightweight, responsive app that knows what is useful to each person." },
    longDescription: { vi: "Orbit được thiết kế cho những tương tác ngắn nhưng lặp lại mỗi ngày, với cá nhân hoá tôn trọng quyền riêng tư.", en: "Orbit is designed for short, everyday moments, with personalisation that respects privacy." },
    highlights: { vi: ["Onboarding thích ứng", "Offline-friendly", "Privacy by design"], en: ["Adaptive onboarding", "Offline-friendly", "Privacy by design"] },
    accent: "cyan",
  },
]

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}
