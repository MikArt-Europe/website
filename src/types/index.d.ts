export type NavItem = {
    title: string
    href: string
    disabled?: boolean
}

export type MainNavItem = NavItem

export type Platform = {
    id: string
    name: string
    icon?: string
}

export type Version = {
    id: string
    version_number: string
    downloads: number
    created_at: string
    file_url: string
    changelog: string
    changelog_url: string
}

export type Resource = {
    id: string
    title: string
    description: string
    slug: string
    created_at: string
    updated_at: string
    latestVersion: string
    totalDownloads: number
    versions: Version[]
}

export type ResourcePlatforms = {
    [key: string]: Platform[]
}