import { NextResponse, type NextRequest } from "next/server"

import { defaultLocale, isLocale } from "@/i18n/config"

const PUBLIC_FILE = /\.(?:avif|bmp|gif|ico|jpe?g|png|svg|txt|webp|xml)$/i

function preferredLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get("sona-global-locale")?.value
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale

  const language = request.headers.get("accept-language")?.toLowerCase() || ""
  return language.startsWith("en") ? "en" : defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next()
  }

  const firstSegment = pathname.split("/")[1]
  if (isLocale(firstSegment)) {
    const response = NextResponse.next()
    response.cookies.set("sona-global-locale", firstSegment, { maxAge: 60 * 60 * 24 * 365, path: "/", sameSite: "lax" })
    return response
  }

  const locale = preferredLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
}
