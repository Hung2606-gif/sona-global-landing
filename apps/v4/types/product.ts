import type { Locale } from "@/i18n/config"

export type ProductGroup = "ai" | "consumer" | "platform"

export type LocalizedValue = Record<Locale, string>

export interface Product {
  slug: string
  group: ProductGroup
  name: string
  eyebrow: LocalizedValue
  description: LocalizedValue
  longDescription: LocalizedValue
  highlights: Record<Locale, string[]>
  accent: "cyan" | "lime" | "violet"
  featured?: boolean
}
