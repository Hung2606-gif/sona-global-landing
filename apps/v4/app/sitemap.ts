import type { MetadataRoute } from "next"

import { products } from "@/content/products"
import { locales } from "@/i18n/config"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4000"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/products", "/ecosystem", "/careers", "/contact", "/privacy", "/terms"]
  return [
    ...locales.flatMap((locale) => staticPaths.map((path) => ({ url: `${baseUrl}/${locale}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.7 }))),
    ...locales.flatMap((locale) => products.map((product) => ({ url: `${baseUrl}/${locale}/products/${product.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 }))),
  ]
}
