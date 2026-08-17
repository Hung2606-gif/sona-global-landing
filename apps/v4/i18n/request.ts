import "server-only"

import en from "@/messages/en.json"
import vi from "@/messages/vi.json"

import type { Locale } from "./config"

const dictionaries = { en, vi } as const

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}
