import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('contentlayer2/source-files').ComputedFields} */
const computedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    }
}

export const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: `blogs/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        },
        tags: {
            type: "list",
            of: { type: "string" },
        },
        date: {
            type: "date",
            required: true,
        },
        published: {
            type: 'boolean',
            default: true,
        },
        image: {
            type: "string",
            required: true,
        },
        authors: {
            // Reference types are not embedded.
            // Until this is fixed, we can use a simple list.
            // type: "reference",
            // of: Author,
            type: "list",
            of: { type: "string" },
            required: true,
        },
    },
    computedFields,
}))

export const Author = defineDocumentType(() => ({
    name: "Author",
    filePathPattern: `authors/**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true,
        },
        description: {
            type: "string",
        },
        avatar: {
            type: "string",
            required: true,
        },
        twitter: {
            type: "string",
            required: true,
        },
    },
    computedFields,
}))

export default makeSource({
    contentDirPath: 'src/layer',
    documentTypes: [Blog, Author],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: 'github-dark-dimmed',
                    onVisitLine(node) {
                        if (node.children.length === 0) {
                            node.children = [{ type: 'text', value: ' ' }]
                        }
                    },
                    onVisitHighlightedLine(node) {
                        node.properties.className.push('line--highlighted')
                    },
                    onVisitHighlightedWord(node) {
                        node.properties.className = ['word--highlighted']
                    },
                }
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['subheading-anchor'],
                        ariaLabel: 'Link to section',
                    },
                },
            ],
        ],
    },
})
