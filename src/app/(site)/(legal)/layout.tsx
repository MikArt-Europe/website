import Footer from '@/components/footer'
import { MainNav } from '@/components/taxomony/main-nav'
import styles from '@/style'
import React from 'react'

interface MarketingLayoutProps {
    children: React.ReactNode
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                    <MainNav
                        items={[
                            {
                                title: 'Home',
                                href: '/#'
                            },
                            {
                                title: 'Temp',
                                href: '/#'
                            },
                            {
                                title: 'Blogs',
                                href: '/blogs'
                            }
                        ]}
                    />
                    {/*<nav>
                        <Link
                            href="/"
                            className={cn(
                                buttonVariants({ variant: "secondary", size: "sm" }),
                                "px-4"
                            )}
                        >
                            Home
                        </Link>
                    </nav>*/}
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <div className={`bg-background ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
