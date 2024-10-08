import {allAuthors, allBlogs} from "contentlayer/generated";
import {notFound} from "next/navigation";
import Image from 'next/image';
import React from "react";
import {Mdx} from "@/components/mdx-components";
import Link from "next/link";
import "@/styles/mdx.css"
import {cn, formatDate} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button"

import {Metadata} from "next";
import {Badge} from "@/components/ui/badge"
import {TracingBeam} from "@/components/ui/tracing-beam";
import {ChevronLeft} from "lucide-react";

interface PostPageProps {
    params: {
        slug: string
    }
}

async function getDocFromParams(slug: string) {
    const doc = allBlogs.find((doc) => doc.slugAsParams === slug);

    if (!doc) notFound()

    return doc
}

export async function generateMetadata({
                                           params,
                                       }: PostPageProps): Promise<Metadata> {
    const post = await getDocFromParams(params.slug)

    if (!post) {
        return {}
    }

    const ogUrl = new URL(`https://mikart.eu/api/og`)
    ogUrl.searchParams.set("heading", post.title)
    ogUrl.searchParams.set("type", "Blog Post")
    ogUrl.searchParams.set("mode", "dark")

    return {
        title: post.title,
        description: post.description,
        authors: post.authors.map((author) => ({
            name: author,
        })),
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            url: post.slug,
            images: [
                {
                    url: ogUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [ogUrl.toString()],
        },
    }
}

export default async function PostPage({params}: PostPageProps) {
    const post = await getDocFromParams(params.slug)

    if (!post) {
        notFound()
    }

    const authors = post.authors.map((author) =>
        allAuthors.find(({slug}) => slug === "/authors/" + author)
    )

    return (
        <article className="container relative max-w-3xl py-6 lg:py-10">
            <Link
                href="/blogs"
                className={cn(
                    buttonVariants({variant: "ghost"}),
                    "absolute left-[-200px] top-14 hidden xl:inline-flex"
                )}
            >
                <ChevronLeft className="mr-2 h-4 w-4"/>
                See all posts
            </Link>
            <div>
                {post.date && (
                    <time
                        dateTime={post.date}
                        className="block text-sm text-muted-foreground"
                    >
                        Published on {formatDate(post.date)}
                    </time>
                )}
                <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
                    {post.title}
                </h1>
                {post.tags?.length ? (
                    <div>
                        {post.tags?.map((tag, index) => (
                            <Badge key={tag} className="mr-2 mt-2" variant={index === 0 ? "default" : "outline"}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                ) : null}
                {authors?.length ? (
                    <div className="mt-4 flex space-x-4">
                        {authors.map((author) =>
                                author ? (
                                    /*<HoverCard>
                                        <HoverCardTrigger>*/
                                            <Link
                                                key={author._id}
                                                href={`https://twitter.com/${author.twitter}`}
                                                className="flex items-center space-x-2 text-sm"
                                            >
                                                <Image
                                                    src={author.avatar}
                                                    alt={author.title}
                                                    width={42}
                                                    height={42}
                                                    className="rounded-full bg-white"
                                                />
                                                <div className="flex-1 text-left leading-tight">
                                                    <p className="font-medium">{author.title}</p>
                                                    <p className="text-[12px] text-muted-foreground">
                                                        @{author.twitter}
                                                    </p>
                                                </div>
                                            </Link>
                                ) : null
                        )}
                    </div>
                ) : null}
            </div>
            {post.image && (
                <Image
                    src={post.image}
                    alt={post.title}
                    width={720}
                    height={405}
                    className="my-8 rounded-md border bg-muted transition-colors"
                    priority
                />
            )
            }
            <TracingBeam className="px-6">
                <Mdx code={post.body.code}/>
            </TracingBeam>
            <hr className="mt-12"/>
            <div className="flex justify-center py-6 lg:py-10">
                <Link href="/blogs" className={cn(buttonVariants({variant: "ghost"}))}>
                    <ChevronLeft className="mr-2 h-4 w-4"/>
                    See all posts
                </Link>
            </div>

        </article>
    )
}