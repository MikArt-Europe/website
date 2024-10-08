import SearchClient from './client'

export const metadata = {
    title: "Search",
    description: "Search the web easily with shortcuts.",
    keywords: [
        "Search",
        "Web",
    ],
}

export default function Page() {
    return (
        <SearchClient />
    )
}