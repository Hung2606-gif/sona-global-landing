import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"

import { getServerEnv } from "@/lib/env"
import { isRateLimited } from "@/lib/rate-limit"

const messageSchema = z.object({ message: z.string().trim().min(1).max(1200), locale: z.enum(["vi", "en"]).default("vi") })

export async function POST(request: NextRequest) {
  const client = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (isRateLimited(`chat:${client}`, 12, 60_000)) return NextResponse.json({ error: "Too many messages. Please try again shortly." }, { status: 429 })
  try {
    const { message, locale } = messageSchema.parse(await request.json())
    const { OPENAI_API_KEY, OPENAI_MODEL } = getServerEnv()
    if (!OPENAI_API_KEY) return NextResponse.json({ error: "The SONA-GLOBAL AI assistant has not been configured yet." }, { status: 503 })
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { authorization: `Bearer ${OPENAI_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        instructions: locale === "vi" ? "Bạn là trợ lý SONA-GLOBAL. Trả lời ngắn gọn, chính xác bằng tiếng Việt về sản phẩm, hệ sinh thái và tuyển dụng của SONA-GLOBAL. Nếu chưa có thông tin, mời người dùng liên hệ nguyenhoainam.090801@gmail.com. Không yêu cầu dữ liệu nhạy cảm." : "You are the SONA-GLOBAL assistant. Answer briefly and accurately in English about SONA-GLOBAL products, ecosystem, and careers. If information is unavailable, direct people to nguyenhoainam.090801@gmail.com. Do not request sensitive information.",
        input: message,
        max_output_tokens: 300,
      }),
      cache: "no-store",
    })
    const data = await response.json()
    if (!response.ok) return NextResponse.json({ error: "The AI assistant is unavailable right now." }, { status: 502 })
    return NextResponse.json({ reply: data.output_text || "I could not generate a response. Please try again." })
  } catch {
    return NextResponse.json({ error: "Please enter a valid message." }, { status: 400 })
  }
}
