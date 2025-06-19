import SearchClient from './client'
import { Suspense } from 'react'

export default function Page() {
    return (
        <Suspense>
            <SearchClient />
        </Suspense>
    )
}
