import {getPageMap} from 'nextra/page-map'
import {Layout, Navbar} from "nextra-theme-docs"
import {Head} from 'nextra/components'
import Footer from "@/components/footer"
import styles from "@/style"
import React from "react"
import Image from "next/image"
import 'nextra-theme-docs/style.css'
import '@/styles/globals.css'

export default async function RootLayout({children}: any) {
    const pageMap = await getPageMap();
    return (
        <html lang="en" suppressHydrationWarning>
            <Head faviconGlyph="✦" backgroundColor={{dark: "rgb(4, 7, 17)"}}/>
            <body>
            <Layout
                editLink="Edit this page on GitHub"
                docsRepositoryBase="https://github.com/mikart-europe/website/tree/master"
                sidebar={{defaultMenuCollapseLevel: 1}}
                navbar={<Navbar chatLink="https://discord.gg/SuXGbq24wA" logo={
                    <Image
                        src="/assets/logo.png"
                        alt="mikart"
                        className="rounded object-contain"
                        width={54} height={54}
                    />
                }/>}
                footer={<div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Footer/>
                    </div>
                </div>}
                pageMap={pageMap}
            >
                {children}
            </Layout>
            </body>
        </html>
    );
}