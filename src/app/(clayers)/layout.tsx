
// import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import Footer from "@/components/footer";
import Link from "next/link";
import {MainNav} from "@/components/taxomony/main-nav";
import {buttonVariants} from "@/components/taxomony/button";
import styles from "@/style";

interface MarketingLayoutProps {
    children: React.ReactNode
}

export default async function MarketingLayout({
                                                  children,
                                              }: MarketingLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                    <MainNav items={[
                        {
                            title: "Home",
                            href: "/#",
                        },
                        {
                            title: "Temp",
                            href: "/#",
                        },
                        {
                            title: "Blogs",
                            href: "/blogs",
                        },
                    ]}/>
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