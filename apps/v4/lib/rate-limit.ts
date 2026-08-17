type RateLimitEntry = { count: number; resetAt: number }

const globalStore = globalThis as typeof globalThis & { sonaGlobalRateLimit?: Map<string, RateLimitEntry> }
const store = globalStore.sonaGlobalRateLimit ?? new Map<string, RateLimitEntry>()
globalStore.sonaGlobalRateLimit = store

export function isRateLimited(key: string, limit = 8, windowMs = 60_000) {
  const now = Date.now()
  const entry = store.get(key)
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }
  entry.count += 1
  return entry.count > limit
}
