import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null
            }

            return (
                <div className="my-8">
                    <Image
                        src={urlFor(value).width(800).height(600).url()}
                        alt={value.alt || 'Blog post image'}
                        width={800}
                        height={600}
                        className="rounded-lg"
                    />
                    {value.alt && <p className="mt-2 text-center text-sm text-muted-foreground">{value.alt}</p>}
                </div>
            )
        }
    },
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-semibold mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-semibold mb-3">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-semibold mb-2">{children}</h4>,
        normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-600">{children}</blockquote>
        )
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    },
    listItem: {
        bullet: ({ children }) => <li>{children}</li>,
        number: ({ children }) => <li>{children}</li>
    },
    marks: {
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        link: ({ children, value }) => (
            <a
                href={value?.href}
                className="text-blue-600 hover:text-blue-800 underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        )
    }
}

interface PortableTextRendererProps {
    content: any[]
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
    return <PortableText value={content} components={components} />
}
