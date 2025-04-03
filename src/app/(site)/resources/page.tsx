import {createClient} from '@/lib/supabase/server'
import {ResourceBrowser} from '@/components/resources/resource-browser'
import {Metadata} from 'next'
import {Resource, Version} from '@/types'

export const metadata: Metadata = {
    title: 'Minecraft Plugins - Resource Browser',
    description: 'Browse and download Minecraft plugins',
}

export default async function ResourceBrowserPage() {
    const supabase = await createClient()

    const {data: resources} = await supabase
        .from('resources')
        .select(`
      *,
      versions(id, version_number, downloads, created_at)
    `)
        .order('updated_at', {ascending: false})
    const enhancedResources = resources?.map((resource) => {
        const latestVersion = resource.versions.sort((a: Version, b: Version) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        })[0];

        const totalDownloads = resource.versions.reduce((sum: number, version: Version ) => sum + version.downloads, 0);

        return {
            ...resource,
            latestVersion: latestVersion?.version_number || 'N/A',
            totalDownloads
        };
    }) || [];

    return <ResourceBrowser resources={enhancedResources as Resource[]}/>
}