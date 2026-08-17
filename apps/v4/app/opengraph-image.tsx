import { ImageResponse } from "next/og"

export const alt = "SONA-GLOBAL — Digital products for meaningful signals"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ alignItems: "flex-start", background: "#09090b", color: "#f4f4f5", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: "72px", width: "100%" }}><div style={{ alignItems: "center", display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: "-1px" }}><span style={{ alignItems: "center", background: "#f4f4f5", borderRadius: 12, color: "#09090b", display: "flex", height: 44, justifyContent: "center", marginRight: 14, width: 44 }}>S</span>SONA-GLOBAL</div><div style={{ display: "flex", flexDirection: "column" }}><span style={{ color: "#a3e635", fontSize: 28, letterSpacing: "4px" }}>DIGITAL PRODUCT STUDIO</span><span style={{ fontSize: 82, fontWeight: 800, letterSpacing: "-5px", lineHeight: 1 }}>Make signal<br />from noise.</span></div></div>, size)
}
