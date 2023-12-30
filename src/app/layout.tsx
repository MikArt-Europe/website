import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from "react";

// TODO: what is this
// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MikArt Europe',
  description: 'MikArt Europe is designed to be a great place where to find coding projects.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body /* TODO: the inter thing was here */>{children}</body>
    </html>
  )
}
