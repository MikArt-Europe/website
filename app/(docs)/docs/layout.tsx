import { source } from '@/lib/source'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import { baseOptions } from '@/app/layout.config'
import {BlocksIcon, HouseIcon, ShieldIcon, SwordIcon} from "lucide-react";

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <DocsLayout
            tree={source.pageTree}
            sidebar={{
                tabs: [
                    {
                        title: 'GroupSecurity',
                        description: 'Minecraft Plugin',
                        url: '/docs/gs',
                        icon: <ShieldIcon />
                    },
                    {
                        title: 'AnimVanish',
                        description: 'Vanish animation Minecraft plugin',
                        url: '/docs/animvanish',
                        icon: <HouseIcon />
                    },
                    {
                        title: 'Panoptic',
                        description: 'Minecraft Plugin',
                        url: '/docs/panoptic',
                        icon: <SwordIcon />
                    },
                    {
                        title: "Minecraft Server",
                        description: "MikArt Europe MC",
                        url: '/docs/minecraft',
                        icon: <BlocksIcon />
                    }
                ]
            }}
            {...baseOptions}>
            {children}
        </DocsLayout>
    )
}
