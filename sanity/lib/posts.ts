import { client } from './client'
import { postsQuery, postBySlugQuery, postSlugsQuery } from './queries'

export interface SanityPost {
    _id: string
    title: string
    slug: {
        current: string
    }
    author: {
        name: string
        slug: {
            current: string
        }
        image?: {
            asset: {
                _id: string
                url: string
            }
        }
        bio?: any[]
    }
    mainImage?: {
        asset: {
            _id: string
            url: string
        }
        alt?: string
    }
    categories?: Array<{
        _id: string
        title: string
        slug: {
            current: string
        }
    }>
    publishedAt: string
    body?: any[]
}

export async function getAllPosts(): Promise<SanityPost[]> {
    return await client.fetch(postsQuery)
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
    return await client.fetch(postBySlugQuery, { slug })
}

export async function getAllPostSlugs(): Promise<string[]> {
    return await client.fetch(postSlugsQuery)
}
