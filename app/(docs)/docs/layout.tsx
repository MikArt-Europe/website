import { source } from '@/lib/source'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import { baseOptions } from '@/app/layout.config'
import {BlocksIcon, HouseIcon, ShieldIcon, SwordIcon} from "lucide-react";
import { env } from '@/env.mjs'

async function getDocsTree() {
    const res = await fetch(`${env.NEXT_PUBLIC_URL}/api/r-doc`, {
        cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
}

export default async function Layout({ children }: { children: ReactNode }) {
    const remoteTree = await getDocsTree();
    const mergedTree = {
        ...source.pageTree,
        children: [...remoteTree, ...source.pageTree.children],
    };

    return (
        <DocsLayout
            tree={mergedTree}
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
