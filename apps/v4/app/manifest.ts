import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return { name: "SONA-GLOBAL", short_name: "SONA-GLOBAL", description: "Digital products for meaningful signals.", start_url: "/vi", display: "standalone", background_color: "#ffffff", theme_color: "#09090b", icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }] }
}
