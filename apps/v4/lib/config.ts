export const siteConfig = {
  name: "SONA-GLOBAL",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4000",
  ogImage: "/opengraph-image",
  description:
    "SONA-GLOBAL builds useful digital products with people at the centre.",
  links: {
    email: "mailto:nguyenhoainam.090801@gmail.com",
    twitter: "https://x.com/",
    github: "https://github.com/",
  },
  navItems: [
    {
      href: "/vi",
      label: "Trang chủ",
    },
    {
      href: "/vi/products",
      label: "Sản phẩm",
    },
    {
      href: "/vi/ecosystem",
      label: "Hệ sinh thái",
    },
    {
      href: "/vi/careers",
      label: "Tuyển dụng",
    },
  ],
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}
