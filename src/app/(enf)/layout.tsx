import Link from "next/link"

import { Icons } from "@/components/taxomony/icons"
import { MainNav } from "@/components/taxomony/main-nav"
import { DocsSearch } from "@/components/taxomony/search"
import { DocsSidebarNav } from "@/components/taxomony/sidebar-nav"
import Footer from "@/components/footer";

interface DocsLayoutProps {
    children: React.ReactNode
}
export default function DocsLayout({ children }: DocsLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 w-full border-b bg-background">
                <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                    <MainNav items={[
                        {
                            title: "Help Center",
                            href: "/docs",
                        },
                        /*{
                            title: "Guides",
                            href: "/guides",
                        },*/
                    ]}>
                        <DocsSidebarNav items={[
                            {
                                title: "Getting Started",
                                items: [
                                    {
                                        title: "Introduction",
                                        href: "/help-center",
                                    },
                                ],
                            },
                            {
                                title: "Minecraft",
                                items: [
                                    {
                                        title: "Server Information",
                                        href: "/help-center/minecraft",
                                    },
                                    {
                                        title: "Server Rules",
                                        href: "/help-center/minecraft/rules",
                                        disabled: true,
                                    },
                                    {
                                        title: "Allowed Modifications",
                                        href: "/help-center/in-progress",
                                        disabled: true,
                                    },
                                ],
                            },
                        ]} />
                    </MainNav>
                    <div className="flex flex-1 items-center space-x-4 sm:justify-end">
                        <div className="flex-1 sm:grow-0">
                            <DocsSearch />
                        </div>
                        <nav className="flex space-x-4">
                            <Link
                                href="https://www.github.com/ArikSquad"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Icons.gitHub className="h-7 w-7" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
            <div className="container flex-1">{children}</div>
            <Footer />
        </div>
    )
}