"use client"

export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="container py-28"><p className="text-sm font-bold text-primary">Something went wrong</p><h1 className="mt-4 text-5xl font-bold tracking-[-0.07em]">Please try again.</h1><button className="mt-8 rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground" onClick={() => reset()} type="button">Retry</button></div>
}
