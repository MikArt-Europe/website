import { source } from '@/lib/source'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import { baseOptions } from '@/app/layout.config'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <DocsLayout
            tree={source.pageTree}
            sidebar={{
                tabs: [
                    {
                        title: 'GroupSecurity',
                        description: 'Minecraft Plugin',
                        url: '/docs/gs'
                    },
                    {
                        title: 'AnimVanish',
                        description: 'Vanish animation Minecraft plugin',
                        url: '/docs/animvanish'
                    },
                    {
                        title: "Minecraft Server",
                        description: "MikArt Europe MC",
                        url: '/docs/minecraft'
                    }
                ]
            }}
            {...baseOptions}>
            {children}
        </DocsLayout>
    )
}
