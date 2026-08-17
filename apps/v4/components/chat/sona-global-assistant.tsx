"use client"

import { useState } from "react"
import type React from "react"

import type { Locale } from "@/i18n/config"

type Message = { role: "assistant" | "user"; content: string }

export function SonaGlobalAssistant({ locale }: { locale: Locale }) {
  const vi = locale === "vi"
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: vi ? "Xin chào! Tôi có thể giới thiệu về SONA-GLOBAL, sản phẩm và cơ hội nghề nghiệp." : "Hello! I can help with SONA-GLOBAL, our products, and career opportunities." }])
  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const message = input.trim()
    if (!message || busy) return
    setInput("")
    setMessages((items) => [...items, { role: "user", content: message }])
    setBusy(true)
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message, locale }) })
      const data = await response.json()
      setMessages((items) => [...items, { role: "assistant", content: data.reply || data.error || "Please try again." }])
    } catch { setMessages((items) => [...items, { role: "assistant", content: vi ? "Không thể kết nối trợ lý lúc này." : "The assistant cannot connect right now." }]) } finally { setBusy(false) }
  }
  return <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"><div className={`mb-3 w-[min(23rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur transition ${open ? "block" : "hidden"}`}><div className="flex items-center justify-between border-b border-border px-4 py-3"><span className="text-xs font-bold tracking-[0.13em]">✦ SONA-GLOBAL / AI</span><button className="rounded p-1 text-muted-foreground hover:bg-muted" onClick={() => setOpen(false)} type="button" aria-label="Close assistant">×</button></div><div className="flex max-h-72 min-h-52 flex-col gap-3 overflow-y-auto p-4">{messages.map((message, index) => <p className={`w-fit max-w-[90%] rounded-xl px-3 py-2 text-sm leading-5 ${message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted text-foreground"}`} key={`${message.role}-${index}`}>{message.content}</p>)}{busy ? <p className="text-xs text-muted-foreground">{vi ? "Đang trả lời..." : "Thinking..."}</p> : null}</div><form className="flex gap-2 border-t border-border p-3" onSubmit={send}><input className="h-9 min-w-0 flex-1 rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" value={input} onChange={(event) => setInput(event.target.value)} placeholder={vi ? "Nhập câu hỏi..." : "Ask a question..."} maxLength={1200} /><button className="rounded-md bg-primary px-3 text-sm font-bold text-primary-foreground disabled:opacity-50" disabled={busy} type="submit">↗</button></form></div><button className="rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg transition hover:-translate-y-1" onClick={() => setOpen((value) => !value)} type="button" aria-expanded={open}>✦ {vi ? "Hỏi SONA-GLOBAL" : "Ask SONA-GLOBAL"}</button></div>
}
