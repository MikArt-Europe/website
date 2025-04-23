import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ResourceDetail from '@/components/resources/resource-detail'
import {Alert, AlertDescription} from '@/components/ui/alert'
import {LucideInfo} from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const paramsStore = await params
    const supabase = await createClient()
    const { data: resource } = await supabase.from('resources').select('*').eq('slug', paramsStore.slug).single()

    if (!resource) {
        return {
            title: 'Resource Not Found'
        }
    }

    return {
        title: resource.title,
        description: resource.description.substring(0, 160)
    }
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
    const paramsStore = await params
    const supabase = await createClient()

    const { data: resource } = await supabase
        .from('resources')
        .select(
            `
      *,
      versions(*)
    `
        )
        .eq('slug', paramsStore.slug)
        .single()

    if (!resource) {
        notFound()
    }

    return (
        <div className="space-y-4">
            <Alert variant="default" className="border-blue-500 bg-blue-50 dark:bg-blue-950/50">
                <LucideInfo className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700 dark:text-blue-300">
                    This is an experimental resource system. Features and functionality may not work.
                </AlertDescription>
            </Alert>
            <ResourceDetail resource={resource}/>
        </div>
    )
}
