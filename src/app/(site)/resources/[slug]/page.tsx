import {notFound} from 'next/navigation'
import {Metadata} from 'next'
import {createClient} from '@/lib/supabase/server'
import ResourceDetail from '@/components/resources/resource-detail'

export async function generateMetadata({params}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const paramsStore = await params;
    const supabase = await createClient()
    const {data: resource} = await supabase
        .from('resources')
        .select('*')
        .eq('slug', paramsStore.slug)
        .single()

    if (!resource) {
        return {
            title: 'Resource Not Found',
        }
    }

    return {
        title: resource.title,
        description: resource.description.substring(0, 160),
    }
}

export default async function ResourcePage({params}: { params: Promise<{ slug: string }> }) {
    const paramsStore = await params;
    const supabase = await createClient()

    const {data: resource} = await supabase
        .from('resources')
        .select(`
      *,
      versions(*)
    `)
        .eq('slug', paramsStore.slug)
        .single()

    if (!resource) {
        notFound()
    }

    return <ResourceDetail resource={resource}/>
}