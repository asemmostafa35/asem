import type { Metadata, Viewport } from "next"
import { Poppins } from "next/font/google"
import "../styles/globals.css"
import { PROFILE } from "@/data/profile"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-poppins" })

const description = `${PROFILE.name}, ${PROFILE.title} with ${PROFILE.experience.toLowerCase()} of experience building web applications with Next.js, React, TypeScript and Node.js.`

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: { default: `${PROFILE.name} | ${PROFILE.title}`, template: `%s | ${PROFILE.name}` },
  description,
  keywords: [PROFILE.name, "Full Stack Developer", "Next.js", "React", "Node.js", "Egypt", "Portfolio"],
  authors: [{ name: PROFILE.name }],
  creator: PROFILE.name,
  openGraph: { type: "website", url: "/", title: `${PROFILE.name} | ${PROFILE.title}`, description, siteName: `${PROFILE.name} Portfolio`, images: [{ url: PROFILE.avatar, width: 960, height: 1280, alt: PROFILE.name }] },
  twitter: { card: "summary_large_image", title: `${PROFILE.name} | ${PROFILE.title}`, description, images: [PROFILE.avatar] },
  icons: { icon: PROFILE.avatar, apple: PROFILE.avatar },
  alternates: { canonical: "/" },
}

export const viewport: Viewport = { width: "device-width", initialScale: 1 }

// Runs before first paint so the saved / system theme is applied without a flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
