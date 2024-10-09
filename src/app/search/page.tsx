import SearchClient from './client'
import {Suspense} from "react";

export const metadata = {
    title: "Search",
    description: "Search the web easily with flags designed to fasten searching.",
    keywords: [
        "search",
        "web"
    ],
    creator: "ariksquad",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.mikart.eu",
        title: "MikArt Europe Search",
        description: "Search the web easily with flags designed to fasten searching.",
        siteName: "MikArt Europe",
    },
}

export default function Page() {
    return (
        <Suspense>
            <SearchClient />
        </Suspense>
    )
}