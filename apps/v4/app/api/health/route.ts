import { NextResponse } from "next/server"

export function GET() {
  return NextResponse.json({ status: "ok", service: "sona-global-web", timestamp: new Date().toISOString() }, { headers: { "cache-control": "no-store" } })
}
