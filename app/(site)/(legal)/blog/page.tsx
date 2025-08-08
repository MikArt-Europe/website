import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts } from '@/sanity/lib/posts'
import { urlFor } from '@/sanity/lib/image'
import { compareDesc } from 'date-fns'
import { CalendarDays, Clock, User } from 'lucide-react'

import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
    title: 'Blog'
}

export default async function BlogPage() {
    const allPosts = await getAllPosts()

    const posts = allPosts
        .filter((post) => post.publishedAt) // Filter published posts
        .sort((a, b) => {
            return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
        })

    return (
        <div className="container max-w-6xl py-6 lg:py-10">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                <div className="flex-1 space-y-4">
                    <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
                        Latest Blog Posts
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Insights, tutorials, and thoughts on development, design, and technology.
                    </p>
                </div>
            </div>
            <hr className="my-8" />

            {posts?.length ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post, index) => (
                        <Card key={post._id} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="relative">
                                {post.mainImage && (
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <Image
                                            src={urlFor(post.mainImage).width(400).height(225).url()}
                                            alt={post.mainImage.alt || post.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            priority={index <= 2}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                )}

                                {/* Categories overlay */}
                                {post.categories && post.categories.length > 0 && (
                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                        {post.categories.slice(0, 2).map((category) => (
                                            <Badge key={category._id} variant="secondary" className="bg-white/90 text-black">
                                                {category.title}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>

                                    {/* Author and date info */}
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        {post.author && (
                                            <div className="flex items-center gap-2">
                                                {post.author.image ? (
                                                    <Image
                                                        src={urlFor(post.author.image).width(24).height(24).url()}
                                                        alt={post.author.name}
                                                        width={24}
                                                        height={24}
                                                        className="rounded-full"
                                                    />
                                                ) : (
                                                    <User className="h-4 w-4" />
                                                )}
                                                <span className="font-medium">{post.author.name}</span>
                                            </div>
                                        )}

                                        {post.publishedAt && (
                                            <div className="flex items-center gap-1">
                                                <CalendarDays className="h-4 w-4" />
                                                <time dateTime={post.publishedAt}>
                                                    {formatDate(post.publishedAt)}
                                                </time>
                                            </div>
                                        )}
                                    </div>

                                    {/* Additional categories */}
                                    {post.categories && post.categories.length > 2 && (
                                        <div className="flex flex-wrap gap-1">
                                            {post.categories.slice(2).map((category) => (
                                                <Badge key={category._id} variant="outline" className="text-xs">
                                                    {category.title}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </CardContent>

                            <Link href={`/blog/${post.slug.current}`} className="absolute inset-0">
                                <span className="sr-only">Read {post.title}</span>
                            </Link>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                        <Clock className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                    <p className="text-muted-foreground">Check back soon for new content!</p>
                </div>
            )}
        </div>
    )
}
