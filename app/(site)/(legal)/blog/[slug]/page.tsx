import { notFound } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import '@/styles/mdx.css'
import { cn, formatDate } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { ChevronLeft, CalendarDays, Clock, Share2 } from 'lucide-react'
import { getPostBySlug, getAllPostSlugs } from '@/sanity/lib/posts'
import { urlFor } from '@/sanity/lib/image'
import { PortableTextRenderer } from '@/components/portable-text'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ShareButton } from '@/components/ui/share-button'

export async function generateStaticParams() {
    const slugs = await getAllPostSlugs()
    return slugs.map((slug) => ({
        slug
    }))
}

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const paramsStore = await params
    const post = await getPostBySlug(paramsStore.slug)

    if (!post) {
        return {}
    }

    const ogUrl = new URL(`https://mikart.eu/api/og`)
    ogUrl.searchParams.set('heading', post.title)
    ogUrl.searchParams.set('type', 'Blog Post')
    ogUrl.searchParams.set('mode', 'dark')

    return {
        title: post.title,
        description: post.body?.[0]?.children?.[0]?.text?.slice(0, 160) || '',
        authors: post.author ? [{ name: post.author.name }] : [],
        openGraph: {
            title: post.title,
            description: post.body?.[0]?.children?.[0]?.text?.slice(0, 160) || '',
            type: 'article',
            url: `/blog/${post.slug.current}`,
            images: post.mainImage
                ? [
                      {
                          url: urlFor(post.mainImage).width(1200).height(630).url(),
                          width: 1200,
                          height: 630,
                          alt: post.mainImage.alt || post.title
                      }
                  ]
                : []
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.body?.[0]?.children?.[0]?.text?.slice(0, 160) || '',
            images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : []
        }
    }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const blogSlug = (await params).slug
    const post = await getPostBySlug(blogSlug)

    if (!post) {
        notFound()
    }

    // Calculate estimated reading time (rough estimate: 200 words per minute)
    const wordCount = post.body
        ? post.body.reduce((count, block) => {
              if (block._type === 'block' && block.children) {
                  return (
                      count +
                      block.children.reduce((childCount: any, child: { text: any }) => {
                          return childCount + (child.text || '').split(' ').length
                      }, 0)
                  )
              }
              return count
          }, 0)
        : 0

    const readingTime = Math.ceil(wordCount / 200)

    return (
        <article className="relative">
            <div className="relative">
                {post.mainImage && (
                    <div className="relative h-[50vh] w-full overflow-hidden">
                        <Image
                            src={urlFor(post.mainImage).width(1200).height(600).url()}
                            alt={post.mainImage.alt || post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                        <Link
                            href="/blog"
                            className={cn(
                                buttonVariants({ variant: 'secondary' }),
                                'absolute left-6 top-6 bg-white/90 hover:bg-white text-black backdrop-blur-sm'
                            )}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Blog
                        </Link>
                    </div>
                )}
            </div>

            <div className="container max-w-4xl">
                <div className={cn('relative mx-auto px-6', post.mainImage ? '-mt-32 mb-12' : 'pt-12 pb-4')}>
                    <Card
                        className={cn(
                            'overflow-hidden',
                            post.mainImage ? 'bg-background/95 backdrop-blur-sm shadow-xl' : 'border-0 shadow-none'
                        )}
                    >
                        <CardContent className="p-8">
                            {post.categories?.length ? (
                                <div className="mb-6">
                                    <div className="flex flex-wrap gap-2">
                                        {post.categories.map((category, index) => (
                                            <Badge
                                                key={category._id}
                                                variant={index === 0 ? 'default' : 'outline'}
                                                className="text-sm"
                                            >
                                                {category.title}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            <h1 className="font-heading text-3xl leading-tight lg:text-5xl mb-6">{post.title}</h1>

                            {post.author && (
                                <div className="border-l-4 border-primary pl-6 mb-6">
                                    <p className="text-sm font-medium text-muted-foreground mb-3">Written by</p>
                                    <div className="flex items-start gap-4">
                                        {post.author.image && (
                                            <Image
                                                src={urlFor(post.author.image).width(60).height(60).url()}
                                                alt={post.author.name}
                                                width={60}
                                                height={60}
                                                className="rounded-full ring-2 ring-primary/20"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">{post.author.name}</h3>
                                            {post.author.bio && post.author.bio[0]?.children?.[0]?.text && (
                                                <p className="text-muted-foreground mt-1 leading-relaxed">
                                                    {post.author.bio[0].children[0].text}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                {post.publishedAt && (
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4" />
                                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                                    </div>
                                )}

                                {readingTime > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        <span>{readingTime} min read</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mx-auto max-w-3xl px-6 pb-12">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                        {post.body && <PortableTextRenderer content={post.body} />}
                    </div>

                    <div className="mt-16 pt-8 border-t">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            {post.author && (
                                <div className="flex items-center gap-3">
                                    {post.author.image && (
                                        <Image
                                            src={urlFor(post.author.image).width(48).height(48).url()}
                                            alt={post.author.name}
                                            width={48}
                                            height={48}
                                            className="rounded-full"
                                        />
                                    )}
                                    <div>
                                        <p className="font-medium">{post.author.name}</p>
                                        <p className="text-sm text-muted-foreground">Author</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <ShareButton post={post} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-12">
                        <Link href="/blog" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to all posts
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    )
}
