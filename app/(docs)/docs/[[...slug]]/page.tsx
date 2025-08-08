import { source } from '@/lib/source'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { getMDXComponents } from '@/mdx-components'
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions'

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
    const params = await props.params
    const page = source.getPage(params.slug)
    if (!page) notFound()

    // Ari - some any types here
    const MDX: any = (page.data as any).body

    return (
        <DocsPage toc={(page.data as any).toc} full={(page.data as any).full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
                <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
                <ViewOptions
                  markdownUrl={`${page.url}.mdx`}
                  githubUrl={`https://github.com/MikArt-Europe/website/blob/main/apps/docs/content/docs/${page.path}`}
                />
              </div>
            <DocsBody>
                <MDX components={getMDXComponents()} />
            </DocsBody>
        </DocsPage>
    )
}

export async function generateStaticParams() {
    return source.generateParams()
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
    const params = await props.params
    const page = source.getPage(params.slug)
    if (!page) notFound()

    return {
        title: page.data.title,
        description: page.data.description
    }
}
