import SearchClient from './client'
import {Suspense} from "react";

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
        <Suspense>
            <SearchClient />
        </Suspense>
    )
}