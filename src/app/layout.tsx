import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/taxomony/toaster"
import { TailwindIndicator } from "@/components/taxomony/tailwind-indicator"
import { ThemeProvider } from "@/components/taxomony/theme-provider"
import type { Viewport } from 'next'


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Font files can be colocated inside `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
}
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata = {
  title: {
    default: "MikArt Europe",
    template: `%s | MikArt`,
  },
  description: "MikArt Europe is designed to be a place for all things we do. We are a group of people who are passionate about technology and design.",
  keywords: [
    "Next.js",
    "React",
  ],
  authors: [
    {
      name: "ArikSquad",
      url: "https://github.com/ArikSquad",
    },
  ],
  creator: "ariksquad",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mikart.eu",
    title: "MikArt",
    description: "MikArt Europe is designed to be a place for all things we do. We are a group of people who are passionate about technology and design.",
    siteName: "MikArt Europe",
  },
  twitter: {
    card: "summary_large_image",
    title: "MikArt Europe",
    description: "MikArt Europe is designed to be a place for all things we do. We are a group of people who are passionate about technology and design.",
    images: [`https://mikart.eu/og.jpg`],
    creator: "@ArikSquad",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `https://mikart.eu/site.webmanifest`,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
      <html lang="en" suppressHydrationWarning>
      <head />
      <body
          className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable,
              fontHeading.variable
          )}
      >
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}

        <Toaster />
        <TailwindIndicator />
      </ThemeProvider>
      </body>
      </html>
  )
}