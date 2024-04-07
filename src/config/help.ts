import {Icons} from "@/components/taxomony/icons";

export type NavItem = {
    title: string
    href: string
    disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
    title: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
} & (
    | {
    href: string
    items?: never
}
    | {
    href?: string
    items: NavItem[]
}
    )

export type DocsConfig = {
    mainNav: MainNavItem[]
    sidebarNav: SidebarNavItem[]
}


export const helpConfig: DocsConfig = {
    mainNav: [
        {
            title: "Help Center",
            href: "/docs",
        },
        /*{
            title: "Guides",
            href: "/guides",
        },*/
    ],
    sidebarNav: [
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
                    disabled: false,
                },
                {
                    title: "Allowed Modifications",
                    href: "/help-center/in-progress",
                    disabled: true,
                },
            ],
        },
    ]
}