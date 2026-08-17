import Link from "next/link"

export default function NotFound() {
  return <div className="container py-28"><p className="text-sm font-bold text-primary">404</p><h1 className="mt-4 text-5xl font-bold tracking-[-0.07em]">Page not found.</h1><p className="mt-4 text-muted-foreground">The page may have moved or no longer exist.</p><Link className="mt-8 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground" href="/vi">Back to SONA-GLOBAL</Link></div>
}
