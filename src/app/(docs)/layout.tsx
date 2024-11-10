import {getPageMap} from 'nextra/page-map'
import {Layout, Navbar} from "nextra-theme-docs";
import 'nextra-theme-docs/style.css'
import Footer from "@/components/footer";
import styles from "@/style";
import React from "react";
import Image from "next/image";


export default async function RootLayout({children}: any) {
    return (
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
            pageMap={await getPageMap()}
        >
            {children}
        </Layout>
    );
}