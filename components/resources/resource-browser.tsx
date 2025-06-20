'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Platform, Version, Resource, ResourcePlatforms } from '@/types'

export function ResourceBrowser({ resources }: { resources: Resource[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [platformFilter, setPlatformFilter] = useState('')
    const [allPlatforms, setAllPlatforms] = useState<Platform[]>([])
    const [resourcePlatforms, setResourcePlatforms] = useState<ResourcePlatforms>({})
    const [view, setView] = useState('grid')
    const supabase = createClient()

    useEffect(() => {
        async function fetchPlatforms() {
            const { data: platforms } = await supabase.from('platforms').select('*')
            setAllPlatforms(platforms || [])

            const latestVersionIds = resources
                .map(
                    (r: Resource) =>
                        r.versions.sort(
                            (a: Version, b: Version) =>
                                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                        )[0]?.id
                )
                .filter(Boolean)

            if (latestVersionIds.length > 0) {
                const { data: versionPlatforms } = await supabase
                    .from('version_platforms')
                    .select(
                        `
            version_id,
            platforms:platform_id(id, name, icon)
          `
                    )
                    .in('version_id', latestVersionIds)

                const platforms: ResourcePlatforms = {}
                versionPlatforms?.forEach((vp) => {
                    for (const resource of resources) {
                        if (resource.versions.some((v: Version) => v.id === vp.version_id)) {
                            if (!platforms[resource.id]) {
                                platforms[resource.id] = []
                            }
                            platforms[resource.id].push(vp.platforms as unknown as Platform)
                            break
                        }
                    }
                })

                setResourcePlatforms(platforms)
            }
        }

        fetchPlatforms()
    }, [resources, supabase])

    const filteredResources = resources.filter((resource: Resource) => {
        const matchesSearch =
            resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchTerm.toLowerCase())

        if (!platformFilter) return matchesSearch

        const supportsPlatform = resourcePlatforms[resource.id]?.some(
            (platform: Platform) => platform.id === platformFilter
        )

        return matchesSearch && supportsPlatform
    })

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-xl">
                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Minecraft Plugins
                </h1>
                <p className="text-muted-foreground mb-6">
                    Browse our collection of high-quality plugins to enhance your Minecraft server
                </p>

                <div className="relative max-w-md mb-6">
                    <Input
                        placeholder="Search plugins..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-background/80 backdrop-blur-sm border-primary/20 focus-visible:ring-primary/30"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                </div>

                <div className="flex flex-wrap gap-2">
                    <Badge
                        variant={!platformFilter ? 'default' : 'outline'}
                        className="cursor-pointer hover:bg-primary/80 transition-colors"
                        onClick={() => setPlatformFilter('')}
                    >
                        All Platforms
                    </Badge>
                    {allPlatforms.map((platform: Platform) => (
                        <Badge
                            key={platform.id}
                            variant={platformFilter === platform.id ? 'default' : 'outline'}
                            className="cursor-pointer hover:bg-primary/80 transition-colors"
                            onClick={() => setPlatformFilter(platform.id)}
                        >
                            {platform.icon && (
                                <span className="mr-1">
                                    <Image
                                        src={platform.icon}
                                        alt={platform.name}
                                        width={16}
                                        height={16}
                                        className="w-4 h-4 inline"
                                    />
                                </span>
                            )}
                            {platform.name}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="mb-6 flex justify-between items-center">
                <p className="text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{filteredResources.length}</span> plugins
                </p>

                <Tabs defaultValue="grid" value={view} onValueChange={setView} className="w-auto">
                    <TabsList className="bg-muted/50">
                        <TabsTrigger value="grid" className="data-[state=active]:bg-background">
                            Grid
                        </TabsTrigger>
                        <TabsTrigger value="list" className="data-[state=active]:bg-background">
                            List
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {filteredResources.length > 0 ? (
                <>
                    {view === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredResources.map((resource: Resource) => (
                                <Card
                                    key={resource.id}
                                    className="flex flex-col h-full overflow-hidden group hover:shadow-md transition-all duration-300 border-primary/10 hover:border-primary/30 relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                    <CardHeader className="pb-2 relative z-10">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                                {resource.title}
                                            </CardTitle>
                                            <Badge
                                                variant="outline"
                                                className="bg-primary/10 text-primary border-primary/20"
                                            >
                                                v{resource.latestVersion}
                                            </Badge>
                                        </div>
                                        <CardDescription className="flex items-center gap-2 mt-1">
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
                                                    className="text-muted-foreground"
                                                >
                                                    <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                                                </svg>
                                                {resource.totalDownloads.toLocaleString()}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                                            <span className="text-xs">
                                                Updated {new Date(resource.updated_at).toLocaleDateString()}
                                            </span>
                                        </CardDescription>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {resourcePlatforms[resource.id]?.map((platform: Platform) => (
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
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow relative z-10 pt-2">
                                        <p className="line-clamp-3 text-sm text-muted-foreground">
                                            {resource.description.replace(/[#*_~]/g, '').substring(0, 150)}...
                                        </p>
                                    </CardContent>
                                    <CardFooter className="pt-2 pb-4 relative z-10">
                                        <Link href={`/resources/${resource.slug}`} className="w-full">
                                            <Button className="w-full bg-primary/90 hover:bg-primary">
                                                View Details
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredResources.map((resource: Resource) => (
                                <Card
                                    key={resource.id}
                                    className="overflow-hidden group hover:shadow-md transition-all duration-300 border-primary/10 hover:border-primary/30 relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                    <div className="flex flex-col md:flex-row gap-4 p-5 relative z-10">
                                        <div className="flex-grow">
                                            <div className="flex items-start justify-between mb-1">
                                                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                                    {resource.title}
                                                </h3>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-primary/10 text-primary border-primary/20"
                                                >
                                                    v{resource.latestVersion}
                                                </Badge>
                                            </div>

                                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
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
                                                    {resource.totalDownloads.toLocaleString()} downloads
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                                                <span>
                                                    Updated {new Date(resource.updated_at).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <p className="line-clamp-2 text-muted-foreground mb-3">
                                                {resource.description.replace(/[#*_~]/g, '').substring(0, 200)}...
                                            </p>

                                            <div className="flex flex-wrap gap-1">
                                                {resourcePlatforms[resource.id]?.map((platform: Platform) => (
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
                                            </div>
                                        </div>

                                        <div className="flex flex-row md:flex-col justify-between items-end gap-3 md:min-w-[140px]">
                                            <Link href={`/resources/${resource.slug}`} className="w-full">
                                                <Button className="w-full bg-primary/90 hover:bg-primary whitespace-nowrap">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-16 bg-muted/20 rounded-lg border border-border">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto text-muted-foreground mb-4"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    <h3 className="text-xl font-medium mb-2">No plugins found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    )
}
