import { createClient } from '@/lib/supabase/server'
import { ResourceBrowser } from '@/components/resources/resource-browser'
import { Metadata } from 'next'
import { Resource, Version } from '@/types'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LucideInfo } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Minecraft Plugins - Resource Browser',
    description: 'Browse and download Minecraft plugins'
}

export default async function ResourceBrowserPage() {
    const supabase = await createClient()

    const { data: resources } = await supabase
        .from('resources')
        .select(
            `
      *,
      versions(id, version_number, downloads, created_at)
    `
        )
        .order('updated_at', { ascending: false })
    const enhancedResources =
        resources?.map((resource) => {
            // Check if versions exists and has items
            if (!resource.versions || resource.versions.length === 0) {
                return {
                    ...resource,
                    latestVersion: 'N/A',
                    totalDownloads: 0
                };
            }

            const latestVersion = resource.versions.sort((a: Version, b: Version) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            })[0]

            const totalDownloads = resource.versions.reduce(
                (sum: number, version: Version) => sum + version.downloads,
                0
            )

            return {
                ...resource,
                latestVersion: latestVersion?.version_number || 'N/A',
                totalDownloads
            }
        }) || []

    return (
        <div className="space-y-4">
            <Alert variant="default" className="border-blue-500 bg-blue-50 dark:bg-blue-950/50">
                <LucideInfo className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700 dark:text-blue-300">
                    This is an experimental resource system. Features and functionality may not work.
                </AlertDescription>
            </Alert>
            <ResourceBrowser resources={enhancedResources as Resource[]} />
        </div>
    )
}
