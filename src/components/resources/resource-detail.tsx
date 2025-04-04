'use client'

import { useState, useEffect, useMemo } from 'react'
import { useToast } from '@/components/hooks/use-toast'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Markdown from 'react-markdown'
import Image from 'next/image'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import { Platform, Version, Resource } from '@/types'
import { components } from '@/components/mdx-components'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'

type ResourceDetailProps = {
    resource: Resource
}

type PlatformsByVersion = {
    [key: string]: Platform[]
}

export default function ResourceDetail({ resource }: ResourceDetailProps) {
    const [selectedVersion, setSelectedVersion] = useState<string>(resource.versions[0]?.id || '')
    const [platforms, setPlatforms] = useState<PlatformsByVersion>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const supabase = createClient()

    // Memoize sorted versions and total downloads
    const sortedVersions = useMemo(
        () =>
            [...resource.versions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
        [resource.versions]
    )

    const totalDownloads = useMemo(
        () => resource.versions.reduce((sum, version) => sum + version.downloads, 0),
        [resource.versions]
    )

    useEffect(() => {
        // Set initially selected version to the newest one
        if (sortedVersions.length > 0 && !selectedVersion) {
            setSelectedVersion(sortedVersions[0].id)
        }

        // Fetch platforms for all versions
        async function fetchPlatforms() {
            const versionIds = resource.versions.map((v: Version) => v.id)
            const { data } = await supabase
                .from('version_platforms')
                .select(
                    `
                    version_id,
                    platforms:platform_id(id, name)
                `
                )
                .in('version_id', versionIds)

            // Organize platforms by version_id
            const platformsByVersion: PlatformsByVersion = {}
            data?.forEach((item: any) => {
                if (!platformsByVersion[item.version_id]) {
                    platformsByVersion[item.version_id] = []
                }
                platformsByVersion[item.version_id].push(item.platforms as Platform)
            })

            setPlatforms(platformsByVersion)
        }

        fetchPlatforms()
    }, [resource.versions, supabase, sortedVersions])

    const handleDownload = async () => {
        if (!selectedVersion) {
            toast({
                title: 'No version selected',
                description: 'Please select a version to download',
                variant: 'destructive'
            })
            return
        }

        const version = resource.versions.find((v) => v.id === selectedVersion)
        if (!version) {
            toast({
                title: 'Invalid version',
                description: 'No matching version found for download.',
                variant: 'destructive'
            })
            setIsLoading(false)
            return
        }
        await supabase
            .from('versions')
            .update({ downloads: version.downloads + 1 })
    }
        setIsLoading(true)
        const version = resource.versions.find((v: Version) => v.id === selectedVersion)

        try {
            // Increment download count
            await supabase
                .from('versions')
                .update({ downloads: version!.downloads + 1 })
                .eq('id', selectedVersion)

            if (version?.file_url) {
                window.location.href = version.file_url
            } else {
                toast({
                    title: 'Download failed',
                    description: 'Invalid file URL',
                    variant: 'destructive'
                })
            }

            toast({
                title: 'Download started',
                description: `Downloading ${resource.title} v${version!.version_number}`
            })
        } catch (error) {
            toast({
                title: 'Download failed',
                description: 'There was a problem starting your download',
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const renderPlatformBadges = (versionId: string) => {
        const versionPlatforms = platforms[versionId] || []
        return (
            <div className="flex flex-wrap gap-2">
                {versionPlatforms.map((platform: Platform) => (
                    <Badge
                        key={platform.id}
                        variant="secondary"
                        className="text-xs bg-secondary/30 hover:bg-secondary/40"
                    >
                        {platform.icon && (
                            <Image
                                src={platform.icon}
                                alt={platform.name}
                                width={12}
                                height={12}
                                className="w-3 h-3 mr-1"
                            />
                        )}
                        {platform.name}
                    </Badge>
                ))}
                {Object.keys(platforms).length === 0 && (
                    <Badge variant="outline" className="animate-pulse">
                        Loading platforms...
                    </Badge>
                )}
            </div>
        )
    }

    const currentVersion = resource.versions.find((v: Version) => v.id === selectedVersion)

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main content - 2/3 width on desktop */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Hero section */}
                    <div className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-xl">
                        <Link
                            href="/resources"
                            className="text-sm text-muted-foreground hover:text-primary mb-2 inline-flex items-center transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-1"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            Back to resources
                        </Link>

                        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {resource.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                                </svg>
                                {totalDownloads.toLocaleString()} downloads
                            </span>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                            <span title={new Date(resource.updated_at).toLocaleString()}>
                                Updated {new Date(resource.updated_at).toLocaleDateString()}
                            </span>
                            {sortedVersions.length > 0 && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                                    <span>Latest: v{sortedVersions[0].version_number}</span>
                                </>
                            )}
                        </div>

                        {platforms[sortedVersions[0]?.id] && (
                            <div className="mb-3">
                                <span className="text-sm text-muted-foreground mr-2">Supported platforms:</span>
                                {renderPlatformBadges(sortedVersions[0]?.id)}
                            </div>
                        )}
                    </div>

                    {/* Tabs for content */}
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="bg-muted/50 w-full justify-start">
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="changelog">Changelog</TabsTrigger>
                            <TabsTrigger value="versions">All Versions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="mt-4">
                            <Card className="border-primary/10">
                                <CardContent className="prose dark:prose-invert max-w-none">
                                    <div className="markdown-content">
                                        <Markdown
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[rehypeSlug, rehypeRaw]}
                                            components={components}
                                        >
                                            {resource.description}
                                        </Markdown>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="changelog" className="mt-4">
                            <Card className="border-primary/10">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        Changelog
                                        {currentVersion && (
                                            <Badge
                                                variant="outline"
                                                className="ml-2 bg-primary/10 text-primary border-primary/20"
                                            >
                                                v{currentVersion.version_number}
                                            </Badge>
                                        )}
                                    </CardTitle>
                                    {currentVersion && (
                                        <CardDescription>
                                            Released on {new Date(currentVersion.created_at).toLocaleDateString()} •{' '}
                                            {currentVersion.downloads.toLocaleString()} downloads
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent className="pt-2 prose dark:prose-invert max-w-none">
                                    {currentVersion ? (
                                        <Markdown>
                                            {currentVersion.changelog || 'No changelog available for this version.'}
                                        </Markdown>
                                    ) : (
                                        <p className="text-muted-foreground italic">
                                            Select a version to view its changelog
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="versions" className="mt-4">
                            <Card className="border-primary/10">
                                <CardHeader>
                                    <CardTitle className="text-xl">All Versions</CardTitle>
                                    <CardDescription>{resource.versions.length} versions available</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="space-y-4">
                                        {sortedVersions.map((version: Version) => (
                                            <Card
                                                key={version.id}
                                                className={`border ${selectedVersion === version.id ? 'border-primary/30 bg-primary/5' : 'border-primary/10'}`}
                                            >
                                                <CardHeader className="p-4 pb-2">
                                                    <div className="flex justify-between items-start">
                                                        <CardTitle className="text-lg flex items-center">
                                                            v{version.version_number}
                                                            {sortedVersions[0].id === version.id && (
                                                                <Badge className="ml-2 bg-primary/20 text-primary border-none">
                                                                    Latest
                                                                </Badge>
                                                            )}
                                                        </CardTitle>
                                                        <Button
                                                            variant={
                                                                selectedVersion === version.id ? 'default' : 'outline'
                                                            }
                                                            size="sm"
                                                            onClick={() => setSelectedVersion(version.id)}
                                                        >
                                                            {selectedVersion === version.id ? 'Selected' : 'Select'}
                                                        </Button>
                                                    </div>
                                                    <CardDescription className="flex items-center gap-2">
                                                        <span>
                                                            Released:{' '}
                                                            {new Date(version.created_at).toLocaleDateString()}
                                                        </span>
                                                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                                                        <span>{version.downloads.toLocaleString()} downloads</span>
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="p-4 pt-2">
                                                    {renderPlatformBadges(version.id)}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar - 1/3 width on desktop */}
                <div className="space-y-6 sticky top-6 self-start max-h-screen overflow-y-auto pb-6">
                    {/* Download card */}
                    <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                        <CardHeader>
                            <CardTitle className="text-xl">Download</CardTitle>
                            <CardDescription>Select a version to download</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a version" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sortedVersions.map((version: Version) => (
                                        <SelectItem key={version.id} value={version.id}>
                                            v{version.version_number}{' '}
                                            {sortedVersions[0].id === version.id && '(Latest)'}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {currentVersion && (
                                <div className="text-sm text-muted-foreground">
                                    <div className="flex justify-between">
                                        <span>Version:</span>
                                        <span className="font-medium text-foreground">
                                            v{currentVersion.version_number}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Released:</span>
                                        <span className="font-medium text-foreground">
                                            {new Date(currentVersion.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Downloads:</span>
                                        <span className="font-medium text-foreground">
                                            {currentVersion.downloads.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div>
                                <Button
                                    className="w-full bg-primary/90 hover:bg-primary transition-colors"
                                    onClick={handleDownload}
                                    disabled={!selectedVersion || isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <svg
                                                className="mr-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                <polyline points="7 10 12 15 17 10" />
                                                <line x1="12" y1="15" x2="12" y2="3" />
                                            </svg>
                                            Download Now
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="text-xs text-muted-foreground">
                            By downloading, you agree to the terms and conditions of use.
                        </CardFooter>
                    </Card>

                    {/* Info card */}
                    <Card className="border-primary/10">
                        <CardHeader>
                            <CardTitle className="text-lg">Resource Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Downloads:</span>
                                <span className="font-medium">{totalDownloads.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">First Added:</span>
                                <span className="font-medium">
                                    {new Date(resource.created_at || resource.updated_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Last Updated:</span>
                                <span className="font-medium">
                                    {new Date(resource.updated_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Versions:</span>
                                <span className="font-medium">{resource.versions.length}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
